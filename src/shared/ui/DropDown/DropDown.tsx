import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import * as styles from "./DropDown.module.scss";
import useOutsideClick from "@/hooks/useOutsideClick";

type DropDownProps = {
  options: string[];
  onSelect: (value: string) => void;
  label?: string;
};

const DropDown: React.FC<DropDownProps> = ({ options, onSelect, label }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useOutsideClick<HTMLElement>({
    ref: [containerRef, dropdownRef],
    action: () => setOpen(false),
  });

  useEffect(() => {
    if (open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(query.toLowerCase())
  );

  const dropdownContent = open ? (
    <ul ref={dropdownRef} className={styles.dropdown} style={dropdownStyle}>
      {filtered.length > 0 ? (
        filtered.map((opt) => (
          <li
            key={opt}
            className={styles.option}
            onClick={() => {
              onSelect(opt);
              setQuery(opt);
              setOpen(false);
            }}
          >
            {opt}
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
        onFocus={() => setOpen(true)}
        placeholder="Search..."
        className={styles.input}
      />
      {ReactDOM.createPortal(dropdownContent, document.body)}
    </div>
  );
};

export default DropDown;
