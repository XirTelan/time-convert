import clsx from "clsx";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { container } from "./Header.module.scss";

const Header = () => {
  return (
    <header className={clsx(container)}>
      <h1>Time Converter</h1>
      <ThemeSwitch />
    </header>
  );
};

export default Header;
