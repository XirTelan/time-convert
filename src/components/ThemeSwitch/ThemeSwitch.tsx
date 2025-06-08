import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/shared/ui/Button/Button";
import { FaCloudMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} label="theme switch">
      {theme === "light" ? <FaCloudMoon /> : <FaSun />}
    </Button>
  );
};
