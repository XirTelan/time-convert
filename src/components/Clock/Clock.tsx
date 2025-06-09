import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import * as styles from "./Clock.module.scss";

type ClockProps = {
  size?: "lg" | "md";
  label?: string;
  timeZone: string;
};

export const Clock = ({ label, timeZone, size = "md" }: ClockProps) => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const zonedDate = toZonedTime(now, timeZone);

  return (
    <div className={styles.clockWrapper}>
      <span className={styles.timezone}>{label ?? timeZone}</span>
      <p className={size === "lg" ? styles.clockLg : styles.clockMd}>
        {format(zonedDate, size === "lg" ? "HH:mm:ss" : "HH:mm")}
      </p>
    </div>
  );
};
