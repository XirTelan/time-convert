import { useEffect, useMemo, RefObject } from "react";

type UseOutsideClickProps<T extends HTMLElement = HTMLElement> = {
  ref: RefObject<T | null> | RefObject<T | null>[];
  action: () => void;
};

const useOutsideClick = <T extends HTMLElement = HTMLElement>({
  ref,
  action,
}: UseOutsideClickProps<T>) => {
  const refs = useMemo(() => (Array.isArray(ref) ? ref : [ref]), [ref]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (refs.every((r) => !r.current?.contains(target))) {
        action();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [refs, action]);
};

export default useOutsideClick;
