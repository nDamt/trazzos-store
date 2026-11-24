"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SLIDES = [
  {
    image: "/images/hero-1.jpg",
    eyebrow: "Nueva colección",
    title: "Bitácoras cosidas a mano",
    text: "Papeles seleccionados para acuarela, tinta y grafito.",
  },
  {
    image: "/images/hero-2.jpg",
    eyebrow: "Para empezar hoy",
    title: "Kits artísticos completos",
    text: "Todo lo necesario en una sola caja, listo para pintar.",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[460px] sm:h-[540px]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-6xl px-4">
                <div className="max-w-md space-y-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-primary">{slide.eyebrow}</p>
                  <h1 className="text-balance-tight text-4xl leading-tight sm:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="text-muted-foreground">{slide.text}</p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button asChild size="lg">
                      <Link href="/tienda">Ver la tienda</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/tienda?categoria=kits-artisticos">Kits artísticos</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3">
          <Button
            variant="secondary"
            size="icon"
            aria-label="Anterior"
            onClick={() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                aria-label={`Ir al slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2 bg-border"}`}
              />
            ))}
          </div>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Siguiente"
            onClick={() => setIndex((i) => (i + 1) % SLIDES.length)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
