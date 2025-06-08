import { DropDown } from "@/shared/ui";
import useTimeStore from "@/hooks/useTimeStore";
import { useMemo } from "react";
import { commonTimeZones } from "@/shared/contants/timezones";

export const TimezoneSelector = ({ to = false }: { to?: boolean }) => {
  const mode = useTimeStore((state) => state.mode);
  const timeZone = useTimeStore((state) =>
    to ? state.toTimeZone : state.fromTimeZone
  );
  const updateTimeZone = useTimeStore((state) => state.updateTimeZone);

  const locations = useMemo(() => {
    return Intl.supportedValuesOf("timeZone").map((tz) => ({
      label: tz.replaceAll("/", " | ").replaceAll("_", " "),
      value: tz,
    }));
  }, []);

  const handleSelect = (value: string) => {
    updateTimeZone(value, to);
  };

  return (
    <DropDown
      defaultValue={timeZone}
      label={to ? "To:" : "From:"}
      options={mode === "timezone" ? commonTimeZones : locations}
      onSelect={handleSelect}
    />
  );
};
