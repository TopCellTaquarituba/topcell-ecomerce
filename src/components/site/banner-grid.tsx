import Image from "next/image";
import Link from "next/link";

type Banner = {
  id?: string;
  title: string;
  description?: string | null;
  image?: string | null;
  buttonLabel?: string | null;
  buttonLink?: string | null;
};

type Props = {
  banners: Banner[];
};

export function BannerGrid({ banners }: Props) {
  if (!banners?.length) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {banners.map((banner) => (
        <div
          key={banner.id ?? banner.title}
          className="relative overflow-hidden rounded-3xl border bg-zinc-950 text-white"
        >
          {banner.image && (
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
          )}
          <div className="relative z-10 space-y-2 px-6 py-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
              Destaque TopCell
            </p>
            <h3 className="text-2xl font-semibold">{banner.title}</h3>
            <p className="text-sm text-zinc-200">{banner.description}</p>
            {banner.buttonLabel && banner.buttonLink && (
              <Link
                href={banner.buttonLink}
                className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900"
              >
                {banner.buttonLabel}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
