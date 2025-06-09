import { DropDown } from "@/shared/ui";
import useTimeSelector from "@/hooks/useTimeSelector";
import * as styles from "./TimezoneSelector.module.scss";
import { clamp } from "date-fns";

type Props = {
  to?: boolean;
};

export const TimezoneSelector = ({ to = false }: Props) => {
  const { mode, timeZone, offset, updateOffset, updateTimeZone, options } =
    useTimeSelector(to ? "to" : "from");

  const handleSelect = (value: string) => {
    updateTimeZone(value, to);
  };

  const handleOffsetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(-12, Math.min(Number(e.target.value) ?? 0, 12));
    updateOffset(val, to);
  };

  return (
    <div className={styles.selector}>
      <DropDown
        defaultValue={timeZone}
        label={to ? "To:" : "From:"}
        options={options}
        onSelect={handleSelect}
      />
      {mode === "timezone" && (
        <div className={styles.offsetInput}>
          <label htmlFor={`offset-${to ? "to" : "from"}`}>
            Offset (±0-12):
          </label>
          <input
            id={`offset-${to ? "to" : "from"}`}
            type="number"
            min={-12}
            max={12}
            step={1}
            value={offset}
            onChange={handleOffsetChange}
          />
        </div>
      )}
    </div>
  );
};
