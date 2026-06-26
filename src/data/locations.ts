// FUENTE DE VERDAD para todas las sucursales.
// Edita aquí para cambiar dirección, teléfono, horarios o agregar una nueva sucursal.
// Al agregar una sucursal, también actualiza el Schema.org en src/layouts/Layout.astro.

export interface BranchSchedule {
  days: string;
  hours: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;         // Formato E.164 para el enlace tel:
  phoneDisplay: string;  // Formato legible para mostrar en pantalla
  schedule: BranchSchedule[];
  mapQuery: string;      // Nombre exacto en Google Maps para el embed
  isNew?: boolean;       // Muestra badge "NUEVA" en la sección de ubicaciones
}

export const branches: Branch[] = [
  {
    id: "ocotlan",
    name: "Sucursal Ocotlán",
    address: "Guillermo Prieto Sur 45, Ocotlán de Morelos, Oaxaca",
    phone: "+52-951-498-0492",
    phoneDisplay: "951 498 0492",
    schedule: [
      { days: "Lunes – Viernes", hours: "5:00am – 10:00pm" },
      { days: "Sábado", hours: "7:00am – 9:00pm" },
      { days: "Domingo", hours: "12:00pm – 4:00pm" },
    ],
    mapQuery: "TRASCIENDE GYM, Ocotlán de Morelos, Oaxaca",
  },
  {
    id: "san-antonino",
    name: "Sucursal San Antonino",
    address: "Cuauhtémoc 50, 1ra Secc, San Antonino Castillo Velasco, Oax.",
    phone: "+52-951-498-0492",
    phoneDisplay: "951 498 0492",
    schedule: [
      { days: "Lunes – Viernes", hours: "6:00am – 10:00pm" },
      { days: "Sábado", hours: "7:00am – 9:00pm" },
      { days: "Domingo", hours: "12:00pm – 4:00pm" },
    ],
    mapQuery: "TRASCIENDE GYM San Antonino Castillo Velasco",
    isNew: true,
  },
];
