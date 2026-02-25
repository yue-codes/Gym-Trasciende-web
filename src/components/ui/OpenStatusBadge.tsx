import { useEffect, useState } from "preact/hooks";

interface ScheduleItem {
  days: string;
  hours: string;
}

interface Props {
  schedule: ScheduleItem[];
}

interface ParsedSchedule {
  days: number[];
  start: { hour: number; minute: number };
  end: { hour: number; minute: number };
}

export default function OpenStatusBadge({ schedule }: Props) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIfOpen = () => {
      // Obtener hora actual en zona horaria de México
      const now = new Date();
      const mexicoTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Mexico_City" }),
      );

      const currentDay = mexicoTime.getDay(); // 0 = Domingo, 6 = Sábado
      const currentHour = mexicoTime.getHours();
      const currentMinute = mexicoTime.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;

      // Parsear horarios
      const parsedSchedule: ParsedSchedule[] = schedule.map((item) => {
        const days = parseDays(item.days);
        const [startStr, endStr] = item.hours.split(" - ");
        const start = parseTime(startStr);
        const end = parseTime(endStr);
        return { days, start, end };
      });

      // Verificar si está abierto
      for (const entry of parsedSchedule) {
        if (entry.days.includes(currentDay)) {
          const startMinutes = entry.start.hour * 60 + entry.start.minute;
          const endMinutes = entry.end.hour * 60 + entry.end.minute;

          if (
            currentTotalMinutes >= startMinutes &&
            currentTotalMinutes < endMinutes
          ) {
            setIsOpen(true);
            return;
          }
        }
      }

      setIsOpen(false);
    };

    // Parsear días de la semana (acepta nombres completos, abreviados y rangos)
    const parseDays = (daysStr: string): number[] => {
      const daysMap: Record<string, number> = {
        domingo: 0,
        dom: 0,
        lunes: 1,
        lun: 1,
        martes: 2,
        mar: 2,
        miércoles: 3,
        miercoles: 3,
        mié: 3,
        mie: 3,
        jueves: 4,
        jue: 4,
        viernes: 5,
        vie: 5,
        sábado: 6,
        sabado: 6,
        sáb: 6,
        sab: 6,
      };
      const lower = daysStr.toLowerCase().trim();
      // Rango: "Lunes a Viernes"
      const rango = lower.match(/(lunes|lun)\s*a\s*(viernes|vie)/);
      if (rango) return [1, 2, 3, 4, 5];
      // Rango: "Lunes a Sábado"
      if (lower.includes("lunes a sábado")) return [1, 2, 3, 4, 5, 6];
      // Día único
      for (const key in daysMap) {
        if (lower === key) return [daysMap[key]];
      }
      // Lista separada por comas
      if (lower.includes(",")) {
        return lower
          .split(",")
          .map((d) => daysMap[d.trim()] ?? -1)
          .filter((n) => n >= 0);
      }
      return [];
    };

    // Parsear hora en formato "6:00 AM" o "10:00 PM"
    const parseTime = (timeStr: string): { hour: number; minute: number } => {
      const [time, period] = timeStr.trim().split(" ");
      const [hourStr, minuteStr] = time.split(":");
      let hour = parseInt(hourStr);
      const minute = parseInt(minuteStr);

      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      return { hour, minute };
    };

    // Verificar inmediatamente
    checkIfOpen();

    // Actualizar cada minuto
    const interval = setInterval(checkIfOpen, 60000);

    return () => clearInterval(interval);
  }, [schedule]);

  // No renderizar hasta que tengamos el estado
  if (isOpen === null) {
    return (
      <span role="status" aria-live="polite" class="inline-flex items-center gap-2 rounded-full bg-gray-500/20 px-3 py-1 text-xs font-medium text-gray-400">
        <span class="h-2 w-2 rounded-full bg-gray-400"></span>
        Cargando...
      </span>
    );
  }

  if (isOpen) {
    return (
      <span role="status" aria-live="polite" class="bg-primary/20 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
        <span class="relative flex h-2 w-2">
          <span class="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
          <span class="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
        </span>
        Abierto ahora
      </span>
    );
  }

  return (
    <span role="status" aria-live="polite" class="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400">
      <span class="h-2 w-2 rounded-full bg-red-400"></span>
      Cerrado
    </span>
  );
}
