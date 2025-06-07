import DropDown from "@/shared/ui/DropDown/DropDown";
import useTimeStore from "@/hooks/useTimeStore";

const TimezoneSelector = ({ to = false }: { to?: boolean }) => {
  const timeZone = useTimeStore((state) =>
    to ? state.toTimeZone : state.fromTimeZone
  );
  const updateTimeZone = useTimeStore((state) => state.updateTimeZone);

  return (
    <DropDown
      defaultValue={timeZone}
      label={to ? "To:" : "From:"}
      options={Intl.supportedValuesOf("timeZone")}
      onSelect={(value: string) => updateTimeZone(value, to)}
    />
  );
};

export default TimezoneSelector;
