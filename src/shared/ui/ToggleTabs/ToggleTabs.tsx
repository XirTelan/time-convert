import React from "react";
import * as styles from "./ToggleTabs.module.scss";
import clsx from "clsx";

type ToggleTabsProps = {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
};

const ToggleTabs= ({
  options,
  value,
  onChange,
  disabled = false,
}: ToggleTabsProps) => {
  return (
    <div className={styles.container}>
      {options.map((opt) => (
        <button
          key={opt}
          className={clsx(
            styles.option,
            value === opt && styles.selected,
            disabled && styles.disabled
          )}
          onClick={() => onChange(opt)}
          disabled={disabled}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default ToggleTabs;
