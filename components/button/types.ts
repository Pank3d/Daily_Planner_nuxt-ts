export interface ButtonProps {
  variant?: "text" | "outlined" | "plain" | "elevated" | "tonal" | "flat";
  color?: string;
  size?: "x-small" | "small" | "default" | "large" | "x-large";
  disabled?: boolean;
  loading?: boolean;
  prependIcon?: string;
  appendIcon?: string;
  block?: boolean;
  rounded?: boolean | string;
  elevation?: string | number;
  customClass?: string;
}
