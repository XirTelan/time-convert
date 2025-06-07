import clsx from "clsx";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch";
import { container } from "./Header.module.scss";

const Header = () => {
  return (
    <header className={clsx(container)}>
      <span style={{ color: "var(--color-accent-light)", fontWeight: 800 }}>
        TimeConverter
      </span>
      <ThemeSwitch />
    </header>
  );
};

export default Header;
