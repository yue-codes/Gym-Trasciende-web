/**
 * PricingSelector - Componente interactivo de precios con Preact
 *
 * Diseño: estética de cupón — header con sello circular de precio,
 * divisor punteado, lista de beneficios y botón CTA full-width.
 * Tarjetas destacadas (featured) incluyen ribbon diagonal.
 */

import { useState } from "preact/hooks";
import {
  type AreaId,
  type Area,
  type PricingCard,
  areas as allAreas,
  pricingData,
} from "../../data/pricing";

interface PricingSelectorProps {
  allowedAreas?: AreaId[]; // IDs de áreas a mostrar
  defaultArea?: AreaId; // Área seleccionada por defecto
  showSelector?: boolean; // Si debe mostrar los botones de cambio de área
}

/** Etiqueta de periodo según el tipo de plan */
function periodLabel(type: PricingCard["type"]): string {
  switch (type) {
    case "Semanal":
      return "/sem";
    case "Quincenal":
      return "/qna";
    case "Mensual":
    case "Mensual estudiante":
    case "Spinning+Pesas":
      return "/mes";
    default:
      return "";
  }
}

export default function PricingSelector({
  allowedAreas,
  defaultArea,
  showSelector = true,
}: PricingSelectorProps) {
  // Filtrar áreas si se proporcionan allowedAreas
  const filteredAreas = allowedAreas
    ? allAreas.filter((area) => allowedAreas.includes(area.id))
    : allAreas;

  // Determinar el área inicial
  const initialArea =
    defaultArea && filteredAreas.some((a) => a.id === defaultArea)
      ? defaultArea
      : filteredAreas[0]?.id || "area2";

  // Estado: área seleccionada
  const [selectedArea, setSelectedArea] = useState<AreaId>(initialArea);

  // Si no hay áreas que mostrar, no renderizar nada
  if (filteredAreas.length === 0) return null;

  const cards = pricingData[selectedArea] ?? [];

  return (
    <div className="relative">
      {/* Selector de Áreas */}
      {showSelector && filteredAreas.length > 1 && (
        <div className="mb-10">
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-center">
              {filteredAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area.id)}
                  aria-pressed={selectedArea === area.id}
                  className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 md:px-6 md:py-3 md:text-base ${
                    selectedArea === area.id
                      ? "bg-primary scale-105 text-black shadow-lg shadow-primary/30"
                      : "border border-zinc-700/50 bg-zinc-800/60 text-secondary hover:border-primary/40 hover:bg-zinc-700/60"
                  }`}
                >
                  <span className="relative">{area.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tarjetas de Precios */}
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
        {cards.map((card, index) => {
          const featured = card.featured ?? false;
          const period = periodLabel(card.type);

          return (
            <div
              key={`${selectedArea}-${index}`}
              className={`relative min-w-72 shrink-0 snap-center overflow-hidden rounded-3xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl md:min-w-0 ${
                featured
                  ? "border border-primary/40 bg-linear-to-br from-[#1a2800] to-zinc-900/80 shadow-lg shadow-primary/10"
                  : "border border-zinc-700/60 bg-zinc-900/80"
              }`}
              style={{
                animation: "fadeInUp 0.6s ease-out",
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
              }}
            >
              {/* Ribbon "Más Popular" */}
              {featured && card.badge && (
                <div className="absolute top-4 right-[-28px] z-10 rotate-45 bg-primary px-10 py-1 text-xs font-bold tracking-wide text-black shadow-md">
                  {card.badge}
                </div>
              )}

              {/* Header: nombre del plan + sello de precio */}
              <div className="flex items-center justify-between gap-4 p-5 pb-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                    Plan
                  </p>
                  <h3
                    className={`mt-0.5 text-lg font-bold leading-tight ${
                      featured ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {card.type}
                  </h3>
                </div>

                {/* Sello circular con precio */}
                <div
                  className={`flex shrink-0 flex-col items-center justify-center rounded-full border-4 p-1 text-center ${
                    featured
                      ? "border-primary bg-[#1a2800]"
                      : "border-zinc-600 bg-zinc-800"
                  }`}
                  style={{ width: "5rem", height: "5rem" }}
                >
                  <span
                    className={`text-base font-extrabold leading-none ${
                      featured ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {card.price}
                  </span>
                  {period && (
                    <span className="mt-0.5 text-[10px] text-zinc-400 leading-none">
                      {period}
                    </span>
                  )}
                </div>
              </div>

              {/* Divisor punteado */}
              <div
                className={`mx-5 border-t-2 border-dashed ${
                  featured ? "border-primary/30" : "border-zinc-700/50"
                }`}
              />

              {/* Cuerpo: beneficios + CTA */}
              <div className="p-5 pt-4">
                <ul className="mb-5 space-y-2.5">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/contacto"
                  className="block w-full rounded-xl bg-primary px-6 py-3 text-center text-sm font-bold text-black transition-all duration-200 hover:brightness-110 active:scale-95"
                >
                  Inscribirme →
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
