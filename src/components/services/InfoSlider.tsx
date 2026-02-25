import { useState, useEffect, useCallback } from "preact/hooks";
import type { JSX } from "preact";

interface InfoSlide {
  title: string;
  description: string;
  items: string[];
  image: string; // 👈 CAMBIAR AQUÍ: Ruta de tu imagen
}

interface InfoSliderProps {
  slides: InfoSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function InfoSlider({
  slides,
  autoPlay = false,
  autoPlayInterval = 5000,
}: InfoSliderProps): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSlides = slides.length;

  // Navegación: Siguiente slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalSlides, isTransitioning]);

  // Navegación: Slide anterior
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalSlides, isTransitioning]);

  // Ir a slide específico (desde dots)
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Touch gestures
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation (scoped to the slider container via onKeyDown)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    },
    [prevSlide, nextSlide],
  );

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide]);

  // Prevenir navegación durante view transitions de Astro
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @view-transition {
        navigation: auto;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div
      class="relative mx-auto w-full max-w-6xl"
      tabIndex={0}
      onKeyDown={(e) => handleKeyDown(e as any)}
      aria-label="Slider de información"
    >
      {/* Slider Container */}
      <div
        class="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm"
        onTouchStart={(e) => handleTouchStart(e as any)}
        onTouchMove={(e) => handleTouchMove(e as any)}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Wrapper */}
        <div
          class="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              class="min-w-full"
              aria-hidden={index !== currentSlide}
            >
              {/* Mobile Layout (Stack) */}
              <div class="flex flex-col md:hidden">
                {/* Imagen */}
                <div class="relative aspect-4/3 w-full overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    class="h-full w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

                {/* Contenido */}
                <div class="space-y-4 p-6">
                  <h3 class="text-2xl font-bold text-white">{slide.title}</h3>
                  <p class="text-base leading-relaxed text-zinc-300">
                    {slide.description}
                  </p>
                  <ul class="space-y-2">
                    {slide.items.map((item, i) => (
                      <li key={i} class="flex items-start gap-3">
                        <svg
                          class="text-primary mt-1 h-5 w-5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          stroke-width="2.5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span class="text-sm text-zinc-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Desktop Layout (Grid) */}
              <div class="hidden grid-cols-5 md:grid">
                {/* Imagen (2 columnas) */}
                <div class="col-span-2 overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    class="h-full w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

                {/* Contenido (3 columnas) */}
                <div class="col-span-3 flex flex-col justify-center space-y-6 p-10">
                  <h3 class="text-3xl leading-tight font-bold text-white lg:text-4xl">
                    {slide.title}
                  </h3>
                  <p class="text-lg leading-relaxed text-zinc-300">
                    {slide.description}
                  </p>
                  <ul class="space-y-3">
                    {slide.items.map((item, i) => (
                      <li key={i} class="flex items-start gap-3">
                        <svg
                          class="text-primary mt-1 h-6 w-6 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          stroke-width="2.5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span class="text-base text-zinc-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prevSlide();
              }}
              disabled={isTransitioning}
              type="button"
              class="hover:border-primary absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-zinc-800 disabled:opacity-50 md:h-12 md:w-12"
              aria-label="Slide anterior"
            >
              <svg
                class="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextSlide();
              }}
              disabled={isTransitioning}
              type="button"
              class="hover:border-primary absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-zinc-800 disabled:opacity-50 md:h-12 md:w-12"
              aria-label="Siguiente slide"
            >
              <svg
                class="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div class="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
              }}
              disabled={isTransitioning}
              type="button"
              class={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary w-8"
                  : "w-2 bg-zinc-600 hover:bg-zinc-500"
              }`}
              aria-label={`Ir al slide ${index + 1}`}
              aria-current={index === currentSlide}
            />
          ))}
        </div>
      )}
    </div>
  );
}
