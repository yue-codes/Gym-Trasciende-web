type NavIcon = "clock" | "tag" | "star" | "grid" | "image";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: NavIcon;
}

export const servicePageNavItems: NavItem[] = [
  { id: "horarios", label: "Horarios", href: "#horarios", icon: "clock" },
  { id: "precios", label: "Precios", href: "#precios", icon: "tag" },
  { id: "inscribirse", label: "Inscríbete", href: "/contacto", icon: "star" },
  { id: "galeria", label: "Galería", href: "#galeria", icon: "image" },
  { id: "servicios", label: "Más", href: "/servicios", icon: "grid" },
];
