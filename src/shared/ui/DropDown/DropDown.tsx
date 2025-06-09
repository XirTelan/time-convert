import { FC } from "react";
import * as styles from "./DropDown.module.scss";
import useDropDown from "@/hooks/useDropDown";
import clsx from "clsx";
import { createPortal } from "react-dom";

type DropDownProps = {
  defaultValue?: string;
  options: {
    value: string;
    label: string;
  }[];
  onSelect: (value: string) => void;
  label?: string;
};

export const DropDown: FC<DropDownProps> = ({
  defaultValue = "",
  options,
  onSelect,
  label,
}) => {
  const {
    query,
    open,
    highlightedIndex,
    containerRef,
    dropdownRef,
    dropdownStyle,
    filtered,
    setQuery,
    setOpen,
    setHighlightedIndex,
    handleFocus,
    handleKeyDown,
  } = useDropDown({ defaultValue, options, onSelect });

  const dropdownContent = open ? (
    <ul ref={dropdownRef} className={styles.dropdown} style={dropdownStyle}>
      {filtered.length > 0 ? (
        filtered.map((opt, index) => (
          <li
            key={opt.value}
            className={clsx(
              styles.option,
              index === highlightedIndex && styles.highlighted
            )}
            onMouseEnter={() => setHighlightedIndex(index)}
            onClick={() => {
              onSelect(opt.value);
              setQuery(opt.label);
              setOpen(false);
              setHighlightedIndex(-1);
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
        onChange={(e) => {
          if (!open) setOpen(true);
          setQuery(e.target.value);
          setHighlightedIndex(-1);
        }}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className={styles.input}
      />
      {createPortal(dropdownContent, document.body)}
    </div>
  );
};
