<script setup lang="ts">
  import { computed } from "vue";
  import { BaseModal } from "../../../components/modal";
  import { BaseButton } from "../../../components/button";
  import type { Task } from "../../../stores";

  interface Props {
    modelValue: boolean;
    task: Task | null;
    loading?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    loading: false,
  });

  const emit = defineEmits<{
    "update:modelValue": [value: boolean];
    close: [];
    confirm: [task: Task];
  }>();

  const isOpen = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit("update:modelValue", value),
  });

  const closeModal = () => {
    emit("close");
  };

  const confirmDelete = () => {
    if (props.task) {
      emit("confirm", props.task);
    }
  };
</script>

<template>
  <BaseModal
    v-model="isOpen"
    title="Удалить задачу"
    max-width="500px"
    @close="closeModal"
  >
    <div v-if="task" class="text-body-1">
      <p class="mb-4">Вы уверены, что хотите удалить задачу?</p>

      <div class="bg-grey-lighten-4 pa-3 rounded mb-4">
        <div class="font-weight-medium mb-2">{{ task.title }}</div>
        <div class="text-body-2 text-grey-darken-1">{{ task.description }}</div>
      </div>

      <p class="text-caption text-error mb-0">
        <VIcon size="16" class="me-1">mdi-alert</VIcon>
        Это действие нельзя отменить
      </p>
    </div>

    <template #actions="{ close }">
      <div class="d-flex justify-end gap-2">
        <BaseButton variant="text" @click="close" :disabled="loading">
          Отмена
        </BaseButton>
        <BaseButton color="error" @click="confirmDelete" :loading="loading">
          Удалить
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
