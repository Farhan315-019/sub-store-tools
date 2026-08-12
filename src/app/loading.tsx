export default function Loading() {
  return (
    <div className="container-x py-16" aria-label="Loading">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto size-10 animate-spin rounded-full border-2 border-border border-t-accent" aria-hidden="true" />
        <p className="mt-4 text-sm text-muted">Loading…</p>
      </div>
    </div>
  );
}
