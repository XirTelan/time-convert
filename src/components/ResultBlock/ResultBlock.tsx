import useTimeStore from "@/hooks/useTimeStore";
import { TZDate } from "@date-fns/tz";
import { addMinutes } from "date-fns";
import { fromZonedTime, format } from "date-fns-tz";
import * as styles from "./ResultBlock.module.scss";
import { useMemo } from "react";

export const ResultBlock = () => {
  const fromTimeZone = useTimeStore((state) => state.fromTimeZone);
  const toTimeZone = useTimeStore((state) => state.toTimeZone);
  const selectedTime = useTimeStore((state) => state.selectedTime);
  const fromOffset = useTimeStore((state) => state.fromOffset);
  const toOffset = useTimeStore((state) => state.toOffset);

  const convertedDate = useMemo(() => {
    const utcDate = fromZonedTime(selectedTime, fromTimeZone);
    const utcWithOffset = addMinutes(utcDate, -fromOffset * 60);
    const targetZonedDate = new TZDate(utcWithOffset, toTimeZone);
    return addMinutes(targetZonedDate, toOffset * 60);
  }, [selectedTime, fromTimeZone, toTimeZone, fromOffset, toOffset]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.toTime}>
        <div>{toTimeZone}</div>
        <div>
          {format(convertedDate, "yyyy-MM-dd z", {
            timeZone: toTimeZone,
          })}
        </div>
      </div>
      <div className={styles.convertedTime}>
        {format(convertedDate, "HH:mm:ss", {
          timeZone: toTimeZone,
        })}
      </div>
    </div>
  );
};
