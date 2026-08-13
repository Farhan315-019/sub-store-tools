import "server-only";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import type { Product } from "@/types";
import { allProducts } from "@/data/products";

export type SellerStatus = "active" | "disabled";

export type Seller = {
  id: string;
  name: string;
  store: string;
  email: string;
  passwordHash: string;
  salt: string;
  status: SellerStatus;
  createdAt: string;
};

export type OrderStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type OrderRecord = {
  id: string;
  productId?: string;
  productName: string;
  plan?: string;
  quantity?: number;
  orderType: "Retail" | "Reseller";
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
};

export type MessageRecord = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
};

type Session = {
  token: string;
  createdAt: string;
};

type AdminAccount = {
  username: string;
  passwordHash: string;
  salt: string;
};

type DB = {
  admin: AdminAccount;
  sessions: Session[];
  sellers: Seller[];
  products: Product[];
  orders: OrderRecord[];
  messages: MessageRecord[];
};

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "store.json");

function hashPassword(password: string): { passwordHash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { passwordHash, salt };
}

function verifyPassword(password: string, salt: string, passwordHash: string): boolean {
  try {
    const candidate = crypto.scryptSync(password, salt, 64);
    const stored = Buffer.from(passwordHash, "hex");
    return stored.length === candidate.length && crypto.timingSafeEqual(candidate, stored);
  } catch {
    return false;
  }
}

function defaultDB(): DB {
  return {
    admin: { username: "admin", ...hashPassword("admin") },
    sessions: [],
    sellers: [],
    products: allProducts,
    orders: [],
    messages: [],
  };
}

function readDB(): DB {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw) as DB;
  } catch {
    const db = defaultDB();
    writeDB(db);
    return db;
  }
}

function writeDB(db: DB): void {
  fs.mkdirSync(DB_DIR, { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

function mutate<T>(fn: (db: DB) => T): T {
  const db = readDB();
  const result = fn(db);
  writeDB(db);
  return result;
}

function sanitizeSeller(seller: Seller) {
  const safe: Record<string, unknown> = { ...seller };
  delete safe.passwordHash;
  delete safe.salt;
  return safe as Omit<Seller, "passwordHash" | "salt">;
}

export const store = {
  verifyAdmin(username: string, password: string): string | null {
    return mutate((db) => {
      if (db.admin.username !== username) return null;
      if (!verifyPassword(password, db.admin.salt, db.admin.passwordHash)) return null;
      const token = crypto.randomBytes(24).toString("hex");
      db.sessions.push({ token, createdAt: new Date().toISOString() });
      if (db.sessions.length > 50) db.sessions = db.sessions.slice(-50);
      return token;
    });
  },

  isValidSession(token: string | undefined): boolean {
    if (!token) return false;
    return readDB().sessions.some((session) => session.token === token);
  },

  revokeSession(token: string | undefined): void {
    if (!token) return;
    mutate((db) => {
      db.sessions = db.sessions.filter((session) => session.token !== token);
    });
  },

  changeAdminPassword(current: string, next: string): boolean {
    return mutate((db) => {
      if (!verifyPassword(current, db.admin.salt, db.admin.passwordHash)) return false;
      db.admin = { username: db.admin.username, ...hashPassword(next) };
      return true;
    });
  },

  getProducts(): Product[] {
    return readDB().products;
  },

  addProduct(product: Product): void {
    mutate((db) => {
      db.products = [product, ...db.products];
    });
  },

  patchProduct(slug: string, patch: Partial<Product>): void {
    mutate((db) => {
      const index = db.products.findIndex((product) => product.slug === slug);
      if (index >= 0) db.products[index] = { ...db.products[index], ...patch };
    });
  },

  deleteProduct(slug: string): void {
    mutate((db) => {
      db.products = db.products.filter((product) => product.slug !== slug);
    });
  },

  getSellers() {
    return readDB().sellers.map(sanitizeSeller);
  },

  createSeller(input: {
    name: string;
    store: string;
    email: string;
    password: string;
  }): { ok: true; seller: ReturnType<typeof sanitizeSeller> } | { ok: false; error: string } {
    return mutate((db) => {
      const email = input.email.trim().toLowerCase();
      if (!email || db.sellers.some((seller) => seller.email.toLowerCase() === email)) {
        return { ok: false, error: "A seller with this email already exists." };
      }
      const seller: Seller = {
        id: crypto.randomUUID(),
        name: input.name.trim(),
        store: input.store.trim(),
        email,
        ...hashPassword(input.password),
        status: "active",
        createdAt: new Date().toISOString(),
      };
      db.sellers = [seller, ...db.sellers];
      return { ok: true, seller: sanitizeSeller(seller) };
    });
  },

  setSellerStatus(id: string, status: SellerStatus): void {
    mutate((db) => {
      const seller = db.sellers.find((item) => item.id === id);
      if (seller) seller.status = status;
    });
  },

  deleteSeller(id: string): void {
    mutate((db) => {
      db.sellers = db.sellers.filter((seller) => seller.id !== id);
    });
  },

  verifySeller(email: string, password: string): Seller | null {
    const seller = readDB().sellers.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.status === "active"
    );
    if (!seller) return null;
    return verifyPassword(password, seller.salt, seller.passwordHash) ? seller : null;
  },

  getOrders(): OrderRecord[] {
    return readDB().orders;
  },

  addOrder(
    input: Omit<OrderRecord, "id" | "status" | "createdAt">
  ): OrderRecord {
    return mutate((db) => {
      const order: OrderRecord = {
        ...input,
        id: crypto.randomUUID().slice(0, 8).toUpperCase(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      db.orders = [order, ...db.orders];
      return order;
    });
  },

  patchOrder(id: string, patch: Partial<OrderRecord>): void {
    mutate((db) => {
      const order = db.orders.find((item) => item.id === id);
      if (order) Object.assign(order, patch);
    });
  },

  deleteOrder(id: string): void {
    mutate((db) => {
      db.orders = db.orders.filter((order) => order.id !== id);
    });
  },

  getMessages(): MessageRecord[] {
    return readDB().messages;
  },

  addMessage(
    input: Omit<MessageRecord, "id" | "createdAt">
  ): MessageRecord {
    return mutate((db) => {
      const message: MessageRecord = {
        ...input,
        id: crypto.randomUUID().slice(0, 8).toUpperCase(),
        createdAt: new Date().toISOString(),
      };
      db.messages = [message, ...db.messages];
      return message;
    });
  },

  deleteMessage(id: string): void {
    mutate((db) => {
      db.messages = db.messages.filter((message) => message.id !== id);
    });
  },

  getOverview() {
    const db = readDB();
    return {
      products: db.products.length,
      sellers: db.sellers.length,
      orders: db.orders.length,
      pendingOrders: db.orders.filter((order) => order.status === "pending").length,
      messages: db.messages.length,
    };
  },
};
