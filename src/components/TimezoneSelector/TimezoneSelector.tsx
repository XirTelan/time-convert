import React, { useState } from "react";
import { addMinutes, parseISO } from "date-fns";
import { TZDate, tzOffset } from "@date-fns/tz";
import { fromZonedTime, format, getTimezoneOffset } from "date-fns-tz";

const commonTimeZones = [
  { label: "UTC", value: "UTC" },

  { label: "EST", value: "America/New_York" },
  { label: "CST", value: "America/Chicago" },
  { label: "MST", value: "America/Denver" },
  { label: "PST", value: "America/Los_Angeles" },

  { label: "GMT", value: "Europe/London" },
  { label: "CET", value: "Europe/Paris" },
  { label: "EET", value: "Europe/Bucharest" },

  { label: "IST", value: "Asia/Kolkata" },
  { label: "JST", value: "Asia/Tokyo" },
  { label: "KST", value: "Asia/Seoul" },

  { label: "AEST", value: "Australia/Sydney" },
  { label: "ACST", value: "Australia/Adelaide" },
  { label: "AWST", value: "Australia/Perth" },

  { label: "AST", value: "Asia/Riyadh" },
  { label: "IRST", value: "Asia/Tehran" },
  { label: "GST", value: "Asia/Dubai" },

  { label: "NZST", value: "Pacific/Auckland" },
  { label: "HST", value: "Pacific/Honolulu" },

  { label: "CST (US)", value: "America/Chicago" },
  { label: "CST (China)", value: "Asia/Shanghai" },
];

const withOffset = commonTimeZones.map((tz) => {
  const offset = format(new Date(), "XXX", { timeZone: tz.value });
  return {
    ...tz,
    label: `${tz.label} (UTC${offset})`,
  };
});

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
        <label>
          From Timezone:
          <select
            value={fromTimeZone}
            onChange={(e) => setFromTimeZone(e.target.value)}
          >
            {commonTimeZones.map((tz) => (
              <option key={tz.label} value={tz.value}>
                {tz.label}
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
          {format(fromTime, "yyyy-MM-dd HH:mm:ss z ", {
            timeZone: fromTimeZone,
          })}
        </p>
        <p>
          To ({toTimeZone}): {}
          {format(convertedDateOff, "yyyy-MM-dd HH:mm:ss z ", {
            timeZone: toTimeZone,
          })}
        </p>
        <p>
          Offset :{" "}

        </p>
      </div>
    </div>
  );
};

export default TimezoneSelector;
