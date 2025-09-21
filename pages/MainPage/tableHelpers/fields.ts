import type { FormField } from "../../../components/Form/types";

export const formFields: FormField[] = [
  {
    name: "title",
    label: "Название",
    type: "text",
    value: "",
    required: true,
    placeholder: "Введите название задачи",
  },
  {
    name: "date",
    label: "Дата",
    type: "datepicker",
    disablePastDates: true,
    value: null,
    required: true,
    placeholder: "Выберите дату",
  },
  {
    name: "description",
    label: "Описание",
    type: "textarea",
    value: "",
    required: true,
    placeholder: "Введите описание задачи",
  },
];
