import { useCallback, useEffect, useRef, useState } from "react";
import useRegOutsideClick from "@/hooks/useOutsideClick";

type Option = {
  value: string;
  label: string;
};

type UseDropDownProps = {
  defaultValue?: string;
  options: Option[];
  onSelect: (value: string) => void;
};

const useDropDown = ({
  defaultValue = "",
  options,
  onSelect,
}: UseDropDownProps) => {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  useRegOutsideClick<HTMLElement>({
    ref: [containerRef, dropdownRef],
    action: () => {
      setOpen(false);
      setHighlightedIndex(-1);
    },
  });

  const handleFocus = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open || filtered.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filtered.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filtered[highlightedIndex];
        if (selected) {
          onSelect(selected.value);
          setQuery(selected.label);
          setOpen(false);
          setHighlightedIndex(-1);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
        setHighlightedIndex(-1);
      }
    },
    [filtered, highlightedIndex, onSelect, open]
  );

  useEffect(() => {
    if (
      highlightedIndex >= 0 &&
      dropdownRef.current &&
      dropdownRef.current.children[highlightedIndex]
    ) {
      const el = dropdownRef.current.children[
        highlightedIndex
      ] as HTMLLIElement;
      el.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return {
    query,
    open,
    highlightedIndex,
    containerRef,
    dropdownRef,
    dropdownStyle,
    filtered,
    setOpen,
    setQuery,
    setHighlightedIndex,
    handleFocus,
    handleKeyDown,
  };
};

export default useDropDown;
