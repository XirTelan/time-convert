import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { timezone, clock } from "./Clock.module.scss";

export const Clock = () => {
  const [time, setTime] = useState<TZDate>(() => new TZDate());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new TZDate());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <span className={timezone}>{format(time, "z")}</span>
      <p className={clock}>{format(time, "HH:mm:ss")}</p>
    </div>
  );
};
