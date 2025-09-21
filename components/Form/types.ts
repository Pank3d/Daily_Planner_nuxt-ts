export interface FormProps {
  fields: FormField[];
  submitText?: string;
  loading?: boolean;
}

export interface ValidationRule {
  (value: unknown): boolean | string;
}

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "select"
    | "checkbox"
    | "datepicker";
  value: unknown;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
  validationRules?: ValidationRule[];
  validationMessage?: string;
  // DatePicker specific props
  disablePastDates?: boolean;
  format?: "DD.MM.YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  minDate?: string | Date;
  maxDate?: string | Date;
}
