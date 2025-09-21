import type { TableColumn } from "../../../../components/table";

export const taskTableColumns: TableColumn[] = [
  {
    key: "title",
    title: "Название",
    sortable: true,
    width: 250,
  },
  {
    key: "description",
    title: "Описание",
    sortable: false,
    width: 300,
  },
  {
    key: "date",
    title: "Дата",
    sortable: true,
    width: 120,
    align: "center",
    formatter: (value: string | number | Date) =>
      new Date(value).toLocaleDateString("ru-RU"),
  },
  {
    key: "completed",
    title: "Статус",
    sortable: true,
    width: 120,
    align: "center",
  },
  {
    key: "createdAt",
    title: "Создано",
    sortable: true,
    width: 140,
    align: "center",
    formatter: (value: string | number | Date) =>
      new Date(value).toLocaleDateString("ru-RU"),
  },
];
