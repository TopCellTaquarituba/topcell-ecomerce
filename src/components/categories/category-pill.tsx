import Link from "next/link";

type Props = {
  name: string;
  slug: string;
  description?: string | null;
};

export function CategoryPill({ name, slug, description }: Props) {
  return (
    <Link
      href={`/products?categoria=${slug}`}
      className="flex flex-col rounded-2xl border bg-white px-4 py-3 shadow-sm transition hover:border-black/40"
    >
      <span className="text-sm font-semibold text-zinc-900">{name}</span>
      {description && <span className="text-xs text-muted-foreground">{description}</span>}
    </Link>
  );
}
