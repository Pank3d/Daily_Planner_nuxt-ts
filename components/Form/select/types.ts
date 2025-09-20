export interface ValidationRule {
  (value: unknown): boolean | string;
}

export interface SelectOption {
  label: string;
  value: any;
}

export interface SelectProps {
  label: string;
  items: SelectOption[];
  disabled?: boolean;
  rules?: ValidationRule[];
  modelValue?: any;
  errorMessages?: string;
}
