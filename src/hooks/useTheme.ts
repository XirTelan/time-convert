import { useEffect, useState } from "react";

export function useTheme(defaultTheme: "light" | "dark" = "light") {
  const [theme, setTheme] = useState<"light" | "dark">(getTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}

const getTheme = () => {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const saved = localStorage.getItem("theme") as "light" | "dark" | null;
  return saved || systemTheme;
};
