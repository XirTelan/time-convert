import { commonTimeZones, locations } from "@/shared/contants/timezones";
import useTimeStore from "./useTimeStore";

const useTimeSelector = (type: "to" | "from") => {
  const mode = useTimeStore((state) => state.mode);
  const timeZone = useTimeStore((state) =>
    type === "to" ? state.toTimeZone : state.fromTimeZone
  );
  const offset = useTimeStore((state) =>
    type === "to" ? state.toOffset : state.fromOffset
  );
  const updateOffset = useTimeStore((state) => state.updateOffset);
  const updateTimeZone = useTimeStore((state) => state.updateTimeZone);

  return {
    mode,
    timeZone,
    offset,
    updateOffset,
    updateTimeZone,
    options: mode === "timezone" ? commonTimeZones : locations,
  };
};

export default useTimeSelector;
