import { CSSProperties, ReactNode } from "react";
import { container } from "./Card.module.scss";
import clsx from "clsx";

type CardProps = {
  children: ReactNode;
  className?: CSSProperties;
};

const Card = ({ children, className }: CardProps) => {
  return <div className={clsx(container, className)}>{children}</div>;
};

export default Card;
