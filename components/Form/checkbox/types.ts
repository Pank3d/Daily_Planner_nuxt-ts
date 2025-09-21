export interface ValidationRule {
  (value: unknown): boolean | string;
}

export interface CheckboxProps {
  label: string;
  disabled?: boolean;
  rules?: ValidationRule[];
  modelValue?: boolean | null;
  errorMessages?: string;
}
