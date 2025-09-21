export interface ValidationRule {
  (value: unknown): boolean | string;
}

export interface SelectOption {
  label: string;
  value: unknown;
}

export interface SelectProps {
  label: string;
  items: SelectOption[];
  disabled?: boolean;
  rules?: ValidationRule[];
  modelValue?: unknown;
  errorMessages?: string;
}
