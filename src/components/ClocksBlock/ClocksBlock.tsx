import React, { useState } from "react";
import { Clock } from "../Clock/Clock";
import * as styles from "./ClocksBlock.module.scss";

const clocks = [
  { label: "Tokyo", timezone: "Asia/Tokyo" },
  { label: "Beijing", timezone: "Asia/Shanghai" },
  { label: "Paris", timezone: "Europe/Paris" },
  { label: "London", timezone: "Europe/London" },
  { label: "New York", timezone: "America/New_York" },
  { label: "Los Angeles", timezone: "America/Los_Angeles" },
];

export const ClocksBlock = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Clock
        size="lg"
        label="Local:"
        timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
      />

      <button
        className={styles.accordionBtn}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls="clocks-list"
      >
        {expanded ? "Hide Clocks" : "Show Clocks"}
      </button>

      <div
        id="clocks-list"
        className={`${styles.clocksRow} ${expanded ? styles.expanded : ""}`}
      >
        {clocks.map((tz) => (
          <Clock
            key={tz.label}
            size="md"
            label={tz.label}
            timeZone={tz.timezone}
          />
        ))}
      </div>
    </div>
  );
};
