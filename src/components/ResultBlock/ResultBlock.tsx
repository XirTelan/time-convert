import useTimeStore from "@/hooks/useTimeStore";
import { TZDate } from "@date-fns/tz";
import { addMinutes } from "date-fns";
import { fromZonedTime, format } from "date-fns-tz";
import * as styles from "./ResultBlock.module.scss";

export const ResultBlock = () => {
  const fromTimeZone = useTimeStore((state) => state.fromTimeZone);
  const toTimeZone = useTimeStore((state) => state.toTimeZone);
  const selectedTime = useTimeStore((state) => state.selectedTime);

  const utcDate = fromZonedTime(selectedTime, fromTimeZone);
  const fromTime = new TZDate(utcDate, fromTimeZone);
  const convertedDate = new TZDate(utcDate, toTimeZone);
  const convertedDateOff = addMinutes(convertedDate, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.toTime}>
        <div>{toTimeZone}</div>
        <div>
          {format(convertedDateOff, "yyyy-MM-dd z", {
            timeZone: toTimeZone,
          })}
        </div>
      </div>
      <div className={styles.convertedTime}>
        {format(convertedDateOff, "HH:mm:ss", {
          timeZone: toTimeZone,
        })}
      </div>
    </div>
  );
};
