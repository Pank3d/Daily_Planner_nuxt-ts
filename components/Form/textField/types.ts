export interface ValidationRule {
  (value: unknown): boolean | string;
}

export interface TextFieldProps {
  type?: "text" | "email" | "password";
  label: string;
  placeholder?: string;
  disabled?: boolean;
  rules?: ValidationRule[];
  modelValue?: string;
  errorMessages?: string;
}


export interface TetxAreaProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  rules?: ValidationRule[];
  modelValue?: string;
  errorMessages?: string;
  rows?: number;
}