/**
 * pricing.ts - Centralización de datos de precios y áreas del gimnasio
 */

export type AreaId = "area1" | "area2" | "area3" | "area4";

export interface PricingCard {
  type:
    | "Semanal"
    | "Quincenal"
    | "Mensual"
    | "Spinning+Pesas"
    | "Mensual estudiante"
    | "3 Meses"
    | "6 Meses"
    | "1 Año"
    | "Visita";
  price: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

export interface Area {
  id: AreaId;
  name: string;
  gradient: string; // Clases de Tailwind para gradiente
}

export const areas: Area[] = [
  {
    id: "area1",
    name: "Clases de Spinning",
    gradient: "from-gray-900/50 via-emerald-600/60 to-gray-900/50",
  },
  {
    id: "area2",
    name: "Fuerza y Pesas",
    gradient: "from-gray-900/50 via-teal-600/60 to-gray-900/50",
  },
  {
    id: "area3",
    name: "Adultos Mayores",
    gradient: "from-gray-900/50 via-cyan-600/60 to-gray-900/50",
  },
  {
    id: "area4",
    name: "Promociones Fin de Año",
    gradient: "from-emerald-600/60 via-teal-600/60 to-cyan-600/60",
  },
];

export const pricingData: Record<AreaId, PricingCard[]> = {
  area2: [
    {
      type: "Visita",
      price: "$35",
      features: [
        "Acceso por un día",
        "Área de pesas",
        "Asesoría personalizada en rutinas",
      ],
    },
    {
      type: "Semanal",
      price: "$110",
      features: [
        "Asesoría personalizada en rutinas",
        "Acceso completo",
        "Lun-Vie 5am-10pm",
        "Sáb 6:00am-5pm",
        "Dom 12pm-4pm",
      ],
    },
    {
      type: "Quincenal",
      price: "$200",
      features: [
        "Asesoría personalizada en rutinas",
        "Acceso completo",
        "Lun-Vie 5am-10pm",
        "Sáb 6:00am-5pm",
        "Dom 12pm-4pm",
      ],
    },
    {
      type: "Mensual",
      price: "$380",
      featured: true,
      badge: "Más Popular",
      features: [
        "Asesoría personalizada en rutinas",
        "Acceso completo",
        "Lun-Vie 5am-10pm",
        "Sáb 6:00am-5pm",
        "Dom 12pm-4pm",
        "Promo estudiante $340",
      ],
    },
  ],
  area1: [
    {
      type: "Visita",
      price: "$45",
      features: ["Acceso por un día", "Clase de Spinning", "Cupo limitado"],
    },
    {
      type: "Semanal",
      price: "$180",
      features: ["Cupo limitado", "Clases incluidas", "Instructor certificado"],
    },
    {
      type: "Quincenal",
      price: "$340",
      features: ["Cupo limitado", "Clases incluidas", "Instructor certificado"],
    },
    {
      type: "Mensual",
      price: "$500",
      featured: true,
      badge: "Más Popular",
      features: [
        "Cupo limitado",
        "Lun-Vie 6am-7am",
        "Lun-Vie 7am-8am",
        "Lun-Vie 6pm-7pm, 7pm-8pm",
      ],
    },
    {
      type: "Spinning+Pesas",
      price: "$800",
      features: [
        "Cupo limitado",
        "Spinning + Pesas",
        "Todos los horarios",
        "Acceso completo",
      ],
    },
    {
      type: "Mensual estudiante",
      price: "$460",
      features: [
        "Cupo limitado",
        "Credencial vigente",
        "Todos los horarios",
        "Instructor certificado",
      ],
    },
  ],
  area3: [
    {
      type: "Semanal",
      price: "$140",
      features: [
        "Lun-Vie 8:15am-9:15am",
        "Clases especializadas",
        "Ambiente seguro",
        "Seguimiento personalizado",
      ],
    },
    {
      type: "Quincenal",
      price: "$200",
      features: [
        "Lun-Vie 8:15am-9:15am",
        "Clases especializadas",
        "Ambiente seguro",
        "Seguimiento personalizado",
      ],
    },
    {
      type: "Mensual",
      price: "$400",
      featured: true,
      badge: "Mejor Valor",
      features: [
        "Lun-Vie 8:15am-9:15am",
        "Clases especializadas",
        "Ambiente seguro",
        "Seguimiento personalizado",
      ],
    },
  ],
  area4: [
    {
      type: "3 Meses",
      price: "$1,000",
      features: ["Horarios de Pesas", "Todos los beneficios del área de pesas"],
    },
    {
      type: "6 Meses",
      price: "$1,900",
      featured: true,
      badge: "Más Popular",
      features: ["Horarios de Pesas", "Todos los beneficios del área de pesas"],
    },
    {
      type: "1 Año",
      price: "$3,750",
      features: [
        "Horarios de Pesas",
        "Todos los beneficios del área de pesas",
        "¡Mejor precio!",
      ],
    },
  ],
};
