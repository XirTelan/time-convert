import React, { useState } from "react";
import { addMinutes, format, parseISO } from "date-fns";
import { TZDate, tzOffset } from "@date-fns/tz";
import { fromZonedTime } from "date-fns-tz";

const timezones = ["UTC", "CST", "CET", "EST", "IST", "JST"];

function parseTime(val: string) {
  const now = new Date(val);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const TimezoneSelector = () => {
  const [fromTimeZone, setFromTimeZone] = useState("UTC");
  const [toTimeZone, setToTimeZone] = useState("UTC");

  const [selectedTime, setSelectedTime] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  });

  const utcDate = fromZonedTime(selectedTime, fromTimeZone);
  const fromTime = new TZDate(utcDate, fromTimeZone);
  const convertedDate = new TZDate(utcDate, toTimeZone);
  const convertedDateOff = addMinutes(convertedDate, 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "350px",
      }}
    >
      <div>
        <label>
          From Timezone:
          <select
            value={fromTimeZone}
            onChange={(e) => setFromTimeZone(e.target.value)}
          >
            {Intl.supportedValuesOf("timeZone").map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          To Timezone:
          <select
            value={toTimeZone}
            onChange={(e) => setToTimeZone(e.target.value)}
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Select Time:
          <input
            type="datetime-local"
            value={selectedTime}
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedTime(parseTime(e.target.value));
            }}
          />
        </label>
      </div>

      <div>
        <p style={{ color: "var(--color-accent)" }}>
          From ({fromTimeZone}):{" "}
          {`${fromTime.toDateString()}: ${fromTime.toTimeString()}`}
        </p>
        <p>
          To ({toTimeZone}): {}
          {`${convertedDateOff.toDateString()}: ${convertedDateOff.toTimeString()}`}
        </p>
        <p>
          Offset ({toTimeZone}):{" "}
          {/* {tzFormat(fromTimeOffset, "XXX", { timeZone: toTimeZone })} */}
        </p>
      </div>
    </div>
  );
};

export default TimezoneSelector;
