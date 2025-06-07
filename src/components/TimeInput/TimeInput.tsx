import { useState, useEffect } from "react";
import useTimeStore from "@/hooks/useTimeStore";
import * as styles from "./TimeInput.module.scss";
import clsx from "clsx";

const TimeInput = () => {
  const selectedTimeFromStore = useTimeStore((state) => state.selectedTime);
  const setSelectedTimeInStore = useTimeStore((state) => state.setSelectedTime);

  const [selectedDate, setSelectedDate] = useState(
    () => selectedTimeFromStore.split("T")[0]
  );
  const [selectedTimeStr, setSelectedTimeStr] = useState(() =>
    selectedTimeFromStore.split("T")[1].slice(0, 5)
  );

  const selectedTime = `${selectedDate}T${selectedTimeStr}`;

  useEffect(() => {
    setSelectedTimeInStore(selectedTime);
  }, [selectedTime, setSelectedTimeInStore]);

  return (
    <div className={styles.container}>
      <div className={styles.timeWrapper}>
        <label className={styles.label}>Time:</label>
        <input
          type="time"
          value={selectedTimeStr}
          onChange={(e) => setSelectedTimeStr(e.target.value)}
          className={clsx(styles.timeInput, styles.input)}
        />
      </div>
      <div className={styles.dateWrapper}>
        <label className={styles.label}>Date:</label>
        <input
          type="date"
          value={selectedDate}
          className={clsx(styles.dateInput, styles.input)}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TimeInput;
