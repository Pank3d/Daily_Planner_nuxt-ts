import type { TableAction } from "../../../../components/table";
import type { Task } from "../../../../stores";
import { useTaskStore } from "../../../../stores";

interface TaskTableEmit {
  (event: "edit-task", task: Task): void;
  (event: "delete-task", task: Task): void;
}

export const createTaskTableActions = (
  emit: TaskTableEmit
): TableAction<Task>[] => {
  const taskStore = useTaskStore();

  return [
    {
      icon: "mdi-check",
      color: "success",
      tooltip: "Отметить как выполненное",
      handler: (task: Task) => {
        taskStore.toggleTaskCompletion(task.id);
      },
      show: (task: Task) => !task.completed,
    },
    {
      icon: "mdi-undo",
      color: "warning",
      tooltip: "Отметить как невыполненное",
      handler: (task: Task) => {
        taskStore.toggleTaskCompletion(task.id);
      },
      show: (task: Task) => task.completed,
    },
    {
      icon: "mdi-pencil",
      color: "primary",
      tooltip: "Редактировать",
      handler: (task: Task) => {
        emit("edit-task", task);
      },
    },
    {
      icon: "mdi-delete",
      color: "error",
      tooltip: "Удалить",
      handler: (task: Task) => {
        emit("delete-task", task);
      },
    },
  ];
};
