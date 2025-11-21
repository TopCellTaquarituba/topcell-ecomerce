"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

type HeroBanner = {
  id?: string;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  buttonLabel?: string | null;
  buttonLink?: string | null;
};

type Props = {
  banners: HeroBanner[];
  fallbackTitle: string;
  fallbackSubtitle: string;
};

export function HeroCarousel({ banners, fallbackTitle, fallbackSubtitle }: Props) {
  const slides = useMemo(() => banners.filter((banner) => banner.image), [banners]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) {
    return (
      <div className="rounded-[40px] border bg-gradient-to-br from-zinc-900 to-black p-8 text-white md:p-12">
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">TopCell</p>
        <h2 className="text-3xl font-semibold md:text-4xl">{fallbackTitle}</h2>
        <p className="mt-3 max-w-3xl text-white/80">{fallbackSubtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/products">Ver cat�logo</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="rounded-full border border-white/40 bg-transparent px-6 text-white hover:bg-white/10"
          >
            <Link href="/checkout">Atendimento online</Link>
          </Button>
        </div>
      </div>
    );
  }

  const active = slides[index]!;
  const link = active.buttonLink ?? "/products";
  const title = active.title ?? fallbackTitle;
  const description = active.description ?? fallbackSubtitle;

  return (
    <div className="relative overflow-hidden rounded-[40px] border bg-black">
      <Link href={link} className="block">
        <div className="relative aspect-[16/9] w-full min-h-[320px] md:min-h-[420px]">
          <Image src={active.image!} alt={title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6 text-white md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Campanha especial</p>
            <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
            <p className="max-w-3xl text-sm text-white/80 md:text-base">{description}</p>
            {active.buttonLabel && (
              <div>
                <Button className="rounded-full px-6" variant="secondary">
                  {active.buttonLabel}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Link>
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((slide, dotIndex) => (
            <span
              key={slide.id ?? dotIndex}
              className={`h-1.5 w-6 rounded-full transition ${
                dotIndex === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
