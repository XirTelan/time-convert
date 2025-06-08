import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import * as styles from "./DropDown.module.scss";
import useRegOutsideClick from "@/hooks/useOutsideClick";

type DropDownProps = {
  defaultValue?: string;
  options: {
    value: string;
    label: string;
  }[];
  onSelect: (value: string) => void;
  label?: string;
};

export const DropDown: React.FC<DropDownProps> = ({
  defaultValue = "",
  options,
  onSelect,
  label,
}) => {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useRegOutsideClick<HTMLElement>({
    ref: [containerRef, dropdownRef],
    action: () => setOpen(false),
  });

  const handleFocus = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen(true);
  };

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const dropdownContent = open ? (
    <ul ref={dropdownRef} className={styles.dropdown} style={dropdownStyle}>
      {filtered.length > 0 ? (
        filtered.map((opt) => (
          <li
            key={opt.value}
            className={styles.option}
            onClick={() => {
              onSelect(opt.value);
              setQuery(opt.label);
              setOpen(false);
            }}
          >
            {opt.label}
          </li>
        ))
      ) : (
        <li className={styles.noResults}>No results</li>
      )}
    </ul>
  ) : null;

  return (
    <div ref={containerRef} className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        placeholder="Search..."
        className={styles.input}
      />
      {ReactDOM.createPortal(dropdownContent, document.body)}
    </div>
  );
};
