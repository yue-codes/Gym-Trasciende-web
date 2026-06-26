export interface BranchSchedule {
  days: string;
  hours: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  schedule: BranchSchedule[];
  mapQuery: string;
  isNew?: boolean;
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
