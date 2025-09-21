export interface ValidationRule {
  (value: unknown): boolean | string;
}

export interface DatePickerProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  rules?: ValidationRule[];
  modelValue?: string | Date | null;
  errorMessages?: string;
  format?: "DD.MM.YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  minDate?: string | Date;
  maxDate?: string | Date;
  disabledDates?: string[] | Date[] | ((date: Date) => boolean);
  locale?: string;
  prependIcon?: string;
  disablePastDates?: boolean;
}
