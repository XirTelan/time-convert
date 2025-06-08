import useTimeStore from "@/hooks/useTimeStore";
import { ToggleTabs } from "@/shared/ui/";

const options = [
  { label: "By Timezone", value: "timezone" as const },
  { label: "By Location", value: "location" as const },
];

export const ModeSwitch = () => {
  const currentMode = useTimeStore((state) => state.mode);
  const setMode = useTimeStore((state) => state.setMode);

  const currentLabel =
    options.find((o) => o.value === currentMode)?.label ?? "";

  return (
    <ToggleTabs
      options={options.map((o) => o.label)}
      value={currentLabel}
      onChange={(label) => {
        const selected = options.find((o) => o.label === label);
        if (selected) setMode(selected.value);
      }}
    />
  );
};
