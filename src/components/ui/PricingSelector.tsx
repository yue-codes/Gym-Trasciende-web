/**
 * PricingSelector - Componente interactivo de precios con Preact
 *
 * Funcionalidad:
 * - Filtra áreas según props
 * - Cambio de fondo dinámico según área seleccionada
 * - Muestra tarjetas de precios por área
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

  // Obtener el gradiente actual
  const currentGradient =
    filteredAreas.find((a) => a.id === selectedArea)?.gradient || "";

  // Si no hay áreas que mostrar, no renderizar nada
  if (filteredAreas.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl">
      {/* Fondo con gradiente - transición suave */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${currentGradient} transition-all duration-1500 ease-in-out`}
      />

      {/* Overlay para suavizar aún más */}
      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 p-4 md:p-12">
        {/* Selector de Áreas - Solo se muestra si showSelector es true y hay más de una área */}
        {showSelector && filteredAreas.length > 1 && (
          <div className="mb-8 md:mb-10">
            <div className="mx-auto max-w-3xl">
              <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-center">
                {filteredAreas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    aria-pressed={selectedArea === area.id}
                    className={`group relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-500 md:px-6 md:py-3 md:text-base ${
                      selectedArea === area.id
                        ? "bg-primary shadow-primary/50 scale-105 text-gray-900 shadow-lg"
                        : "bg-white/80 text-gray-900 backdrop-blur-sm hover:bg-white/90"
                    }`}
                  >
                    {/* Efecto de brillo en hover */}
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                    <span className="relative">{area.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tarjetas de Precios - Scroll horizontal en móvil */}
        <div className="relative">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
            {pricingData[selectedArea]?.map((card, index) => (
              <div
                key={`${selectedArea}-${index}`}
                className="group max-w-62.5 min-w-62.5 shrink-0 snap-center rounded-2xl bg-white/85 p-5 shadow-lg backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] hover:bg-linear-to-br hover:from-emerald-500/90 hover:to-teal-600/90 hover:shadow-2xl active:scale-[0.98] md:max-w-none md:min-w-0 md:hover:-translate-y-2 md:hover:scale-[1.03]"
                style={{
                  animation: "fadeInUp 0.8s ease-out",
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Tipo de plan */}
                <h3 className="mb-2 text-center text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-white">
                  {card.type}
                </h3>

                {/* Precio */}
                <div className="mb-6 text-center">
                  <span className="text-4xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-white">
                    {card.price}
                  </span>
                  {(card.type === "Semanal" ||
                    card.type === "Quincenal" ||
                    card.type === "Mensual" ||
                    card.type === "Mensual estudiante") && (
                    <span className="text-gray-600 transition-colors duration-300 group-hover:text-white/90">
                      /
                      {card.type === "Semanal"
                        ? "semana"
                        : card.type === "Quincenal"
                          ? "quincena"
                          : "mes"}
                    </span>
                  )}
                </div>

                {/* Características */}
                <ul className="mb-6 space-y-3">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-gray-700 transition-colors duration-300 group-hover:text-white"
                    >
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-green-500 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Botón CTA como enlace a contacto */}
                <a
                  href="/contacto"
                  className="block w-full rounded-lg bg-linear-to-r from-gray-900 to-gray-800 px-6 py-3 text-center font-semibold text-white transition-all duration-300 group-hover:bg-white group-hover:from-white group-hover:to-white group-hover:text-emerald-700 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  Inscribirme
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estilos para la animación fadeInUp */}
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
