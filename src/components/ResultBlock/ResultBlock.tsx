import useTimeStore from "@/hooks/useTimeStore";
import Card from "@/shared/ui/Card/Card";
import { TZDate } from "@date-fns/tz";
import { addMinutes } from "date-fns";
import { fromZonedTime, format } from "date-fns-tz";

const ResultBlock = () => {
  const fromTimeZone = useTimeStore((state) => state.fromTimeZone);
  const toTimeZone = useTimeStore((state) => state.toTimeZone);
  const selectedTime = useTimeStore((state) => state.selectedTime);
  const utcDate = fromZonedTime(selectedTime, fromTimeZone);
  const fromTime = new TZDate(utcDate, fromTimeZone);
  const convertedDate = new TZDate(utcDate, toTimeZone);
  const convertedDateOff = addMinutes(convertedDate, 0);

  return (
    <div>
      <Card>
        <div>
          <p>
            From ({fromTimeZone}):{" "}
            {format(fromTime, "yyyy-MM-dd z", {
              timeZone: fromTimeZone,
            })}
          </p>
          <p style={{ color: "var(--color-accent)" }}>
            {format(fromTime, "HH:mm:ss", {
              timeZone: fromTimeZone,
            })}
          </p>
          <p>
            To ({toTimeZone}):{" "}
            {format(convertedDateOff, "yyyy-MM-dd z", {
              timeZone: toTimeZone,
            })}
          </p>
        </div>
      </Card>
      <p
        style={{
          backgroundColor: "var(--color-accent)",
          fontSize: "clamp(14px, 10vw, 6rem)",
          fontWeight: 600,
          padding: "0.5rem",
        }}
      >
        {format(convertedDateOff, "HH:mm:ss", {
          timeZone: toTimeZone,
        })}
      </p>
    </div>
  );
};

export default ResultBlock;
