<script setup lang="ts">
import { computed } from "vue";
import { BaseTable } from "../../../components/table";
import type { TableColumn, TableAction } from "../../../components/table";
import { useTaskStore, type Task } from "../../../stores";

interface Props {
  tasks?: Task[];
}

const props = withDefaults(defineProps<Props>(), {
  tasks: [],
});

const taskStore = useTaskStore();

const emit = defineEmits<{
  "edit-task": [task: Task];
  "delete-task": [task: Task];
}>();

const columns: TableColumn[] = [
  {
    key: "title",
    title: "Название",
    sortable: true,
    width: 250
  },
  {
    key: "description",
    title: "Описание",
    sortable: false,
    width: 300
  },
  {
    key: "date",
    title: "Дата",
    sortable: true,
    width: 120,
    align: "center",
    formatter: (value: string | number | Date) => new Date(value).toLocaleDateString("ru-RU")
  },
  {
    key: "completed",
    title: "Статус",
    sortable: true,
    width: 120,
    align: "center"
  },
  {
    key: "createdAt",
    title: "Создано",
    sortable: true,
    width: 140,
    align: "center",
    formatter: (value: string | number | Date) => new Date(value).toLocaleDateString("ru-RU")
  }
];

const actions: TableAction[] = [
  {
    icon: "mdi-check",
    color: "success",
    tooltip: "Отметить как выполненное",
    handler: (task: Task) => {
      taskStore.toggleTaskCompletion(task.id);
    },
    show: (task: Task) => !task.completed
  },
  {
    icon: "mdi-undo",
    color: "warning",
    tooltip: "Отметить как невыполненное",
    handler: (task: Task) => {
      taskStore.toggleTaskCompletion(task.id);
    },
    show: (task: Task) => task.completed
  },
  {
    icon: "mdi-pencil",
    color: "primary",
    tooltip: "Редактировать",
    handler: (task: Task) => {
      emit("edit-task", task);
    }
  },
  {
    icon: "mdi-delete",
    color: "error",
    tooltip: "Удалить",
    handler: (task: Task) => {
      emit("delete-task", task);
    }
  }
];

const tasks = computed(() => props.tasks || taskStore.tasks);

const handleItemClick = (task: Task) => {
  console.log("Клик по задаче:", task);
};
</script>

<template>
  <BaseTable
    :items="tasks"
    :columns="columns"
    :actions="actions"
    :items-per-page="10"
    no-data-text="Нет задач"
    @item:click="handleItemClick"
  >
    <!-- Кастомный слот для статуса -->
    <template #item.completed="{ item, value }">
      <VChip
        :color="value ? 'success' : 'warning'"
        size="small"
        variant="flat"
      >
        {{ value ? 'Выполнено' : 'В работе' }}
      </VChip>
    </template>

    <!-- Кастомный слот для названия задачи -->
    <template #item.title="{ item, value }">
      <div class="d-flex align-center">
        <VIcon
          :color="item.completed ? 'success' : 'grey'"
          class="me-2"
          size="small"
        >
          {{ item.completed ? 'mdi-check-circle' : 'mdi-circle-outline' }}
        </VIcon>
        <span :class="{ 'text-decoration-line-through text-grey': item.completed }">
          {{ value }}
        </span>
      </div>
    </template>

    <!-- Кастомный слот для описания -->
    <template #item.description="{ item, value }">
      <span
        :class="{ 'text-decoration-line-through text-grey': item.completed }"
        class="text-body-2"
      >
        {{ value }}
      </span>
    </template>

    <!-- Кастомный слот для пустых данных -->
    <template #no-data>
      <div class="text-center pa-8">
        <VIcon size="80" color="grey-lighten-2">mdi-clipboard-text-outline</VIcon>
        <div class="text-h5 mt-4">Задач пока нет</div>
        <div class="text-body-1 text-grey">Создайте первую задачу</div>
      </div>
    </template>
  </BaseTable>
</template>