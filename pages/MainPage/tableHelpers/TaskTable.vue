<script setup lang="ts">
  import { computed } from "vue";
  import { BaseTable, TableAction } from "../../../components/table";
  import { useTaskStore, type Task } from "../../../stores";
  import { taskTableColumns, createTaskTableActions } from "./taskTableHelpers";

  interface Props {
    tasks?: Task[];
  }

  const props = withDefaults(defineProps<Props>(), {
    tasks: () => [],
  });

  const taskStore = useTaskStore();

  const emit = defineEmits<{
    "edit-task": [task: Task];
    "delete-task": [task: Task];
  }>();

  const columns = taskTableColumns;

  const actions = createTaskTableActions(emit);

  const tasks = computed(() => props.tasks || taskStore.tasks);

  const handleItemClick = (task: unknown) => {
    console.log("Клик по задаче:", task);
  };
</script>

<template>
  <BaseTable
    :items="tasks"
    :columns="columns"
    :actions="actions as TableAction<unknown>[]"
    :items-per-page="10"
    no-data-text="Нет задач"
    @item:click="handleItemClick"
  >
    <!-- Кастомный слот для статуса -->
    <template #item.completed="{ item, value }">
      <VChip :color="value ? 'success' : 'warning'" size="small" variant="flat">
        {{ value ? "Выполнено" : "В работе" }}
      </VChip>
    </template>

    <!-- Кастомный слот для названия задачи -->
    <template #item.title="{ item, value }">
      <div class="d-flex align-center">
        <VIcon
          :color="(item as Task).completed ? 'success' : 'grey'"
          class="me-2"
          size="small"
        >
          {{
            (item as Task).completed ? "mdi-check-circle" : "mdi-circle-outline"
          }}
        </VIcon>
        <span
          :class="{
            'text-decoration-line-through text-grey': (item as Task).completed,
          }"
        >
          {{ value }}
        </span>
      </div>
    </template>

    <!-- Кастомный слот для описания -->
    <template #item.description="{ item, value }">
      <span
        :class="{
          'text-decoration-line-through text-grey': (item as Task).completed,
        }"
        class="text-body-2"
      >
        {{ value }}
      </span>
    </template>

    <!-- Кастомный слот для пустых данных -->
    <template #no-data>
      <div class="text-center pa-8">
        <VIcon size="80" color="grey-lighten-2"
          >mdi-clipboard-text-outline</VIcon
        >
        <div class="text-h5 mt-4">Задач пока нет</div>
        <div class="text-body-1 text-grey">Создайте первую задачу</div>
      </div>
    </template>
  </BaseTable>
</template>
