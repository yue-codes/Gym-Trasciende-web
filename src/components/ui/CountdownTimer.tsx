/**
 * CountdownTimer - Countdown minimalista hasta fin de febrero 2026
 * Componente Preact para mostrar cuenta regresiva
 */

import { useState, useEffect } from "preact/hooks";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  targetDate: string;
}

export default function CountdownTimer({ targetDate: targetDateStr }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(targetDateStr).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="min-w-17.5 rounded-lg border border-emerald-500/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
        <span className="text-3xl font-bold text-emerald-400 tabular-nums md:text-4xl">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs tracking-wide text-gray-400 uppercase md:text-sm">
        {label}
      </span>
    </div>
  );

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-4">
      <TimeUnit value={timeLeft.days} label="Días" />
      <span className="text-2xl text-white">:</span>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <span className="text-2xl text-white">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutos" />
      <span className="text-2xl text-white">:</span>
      <TimeUnit value={timeLeft.seconds} label="Segundos" />
    </div>
  );
}
