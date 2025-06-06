import { ComponentProps, ReactNode } from "react";
import * as styles from "./Button.module.scss";

const {
  button,
  ["button--primary"]: buttonPrimary,
  ["button--danger"]: buttonDanger,
} = styles;

import clsx from "clsx";

type ButtonProps = {
  children?: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "primary" | "danger";
} & ComponentProps<"button">;

export const Button: React.FC<ButtonProps> = ({
  children,
  label,
  onClick,
  className,
  disabled = false,
  variant = "default",
  type = "button",
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={clsx(
        button,
        className,
        variant === "primary" && buttonPrimary,
        variant === "danger" && buttonDanger
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
