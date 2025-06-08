import { FaGithub } from "react-icons/fa";
import { wrapper } from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={wrapper}>
      <FaGithub />
      <a
        href="https://github.com/XirTelan/time-convert"
        rel="nofollow noreferrer noopener"
      >
        GitHub Page
      </a>
    </footer>
  );
};

export default Footer;
