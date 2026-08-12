export type CategoryColor = {
  dot: string;
  chip: string;
  text: string;
  icon: string;
  glow: string;
  hoverBorder: string;
  solid: string;
};

export const categoryColors: Record<string, CategoryColor> = {
  "ott-services": {
    dot: "bg-rose-500",
    chip: "border-rose-500/30 bg-rose-500/10 text-rose-400",
    text: "text-rose-400",
    icon: "border-rose-500/20 bg-rose-500/10 text-rose-400",
    glow: "bg-rose-500/10",
    hoverBorder: "hover:border-rose-500/40",
    solid: "bg-rose-500",
  },
  "ai-tools": {
    dot: "bg-cyan-400",
    chip: "border-cyan-400/30 bg-cyan-400/10 text-cyan-400",
    text: "text-cyan-400",
    icon: "border-cyan-400/20 bg-cyan-400/10 text-cyan-400",
    glow: "bg-cyan-400/10",
    hoverBorder: "hover:border-cyan-400/40",
    solid: "bg-cyan-400",
  },
  "vpn-proxy": {
    dot: "bg-emerald-400",
    chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    text: "text-emerald-400",
    icon: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
    glow: "bg-emerald-400/10",
    hoverBorder: "hover:border-emerald-400/40",
    solid: "bg-emerald-400",
  },
  "study-professional": {
    dot: "bg-blue-400",
    chip: "border-blue-400/30 bg-blue-400/10 text-blue-400",
    text: "text-blue-400",
    icon: "border-blue-400/20 bg-blue-400/10 text-blue-400",
    glow: "bg-blue-400/10",
    hoverBorder: "hover:border-blue-400/40",
    solid: "bg-blue-400",
  },
  "editing-software": {
    dot: "bg-amber-400",
    chip: "border-amber-400/30 bg-amber-400/10 text-amber-400",
    text: "text-amber-400",
    icon: "border-amber-400/20 bg-amber-400/10 text-amber-400",
    glow: "bg-amber-400/10",
    hoverBorder: "hover:border-amber-400/40",
    solid: "bg-amber-400",
  },
};

export function getCategoryColor(categorySlug: string): CategoryColor {
  return categoryColors[categorySlug] ?? categoryColors["ai-tools"];
}
