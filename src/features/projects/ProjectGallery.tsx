import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "./projects.types";

type ProjectGalleryProps = {
  images: ProjectImage[];
  /** When set, clicking a slide opens this URL in a new tab. */
  href?: string;
};

export function ProjectGallery({ images, href }: ProjectGalleryProps) {
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="space-y-4">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        className="group relative overflow-hidden rounded-lg border border-border-strong bg-surface shadow-2xl"
      >
        <CarouselContent className="ml-0">
          {images.map((image, index) => {
            const slide = (
              <img
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                className="aspect-[16/10] w-full object-cover object-top"
              />
            );
            return (
              <CarouselItem key={image.src} className="pl-0">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open the live project — ${image.alt}`}
                    className="block cursor-pointer"
                  >
                    {slide}
                  </a>
                ) : (
                  slide
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-4 opacity-0 transition-opacity group-hover:opacity-100" />
        <CarouselNext className="right-4 opacity-0 transition-opacity group-hover:opacity-100" />
      </Carousel>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selected}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === selected
                ? "w-6 bg-accent"
                : "w-1.5 bg-border-strong hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
    </div>
  );
}
