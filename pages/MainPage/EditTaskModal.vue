<script setup lang="ts">
import { computed } from "vue";
import { BaseModal } from "../../components/modal";
import { BaseForm } from "../../components/Form";
import { BaseDatePicker } from "../../components/Form/datePicker";
import { BaseButton } from "../../components/button";
import { useTaskStore, type Task } from "../../stores";
import { formFields } from "./fields";

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
  submit: [formData: Omit<Task, "id" | "completed" | "createdAt">];
}>();

const taskStore = useTaskStore();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const closeModal = () => {
  emit("close");
};

const handleSubmit = (
  formData: Omit<Task, "id" | "completed" | "createdAt">
) => {
  emit("submit", formData);
};

const getEditFormFields = () => {
  if (!props.task) return formFields;

  return formFields.map((field) => ({
    ...field,
    value:
      field.name === "title"
        ? props.task?.title
        : field.name === "description"
        ? props.task?.description
        : field.name === "date"
        ? props.task?.date
        : field.value,
  }));
};
</script>

<template>
  <BaseModal
    v-model="isOpen"
    title="Редактировать задачу"
    max-width="600px"
    @close="closeModal"
  >
    <BaseForm
      v-if="task"
      :fields="getEditFormFields()"
      submit-text="Сохранить"
      :loading="loading"
      @submit="handleSubmit"
    >
      <template #field="{ field, fieldProps }">
        <BaseDatePicker
          v-if="field.type === 'datepicker'"
          v-bind="fieldProps"
          :label="field.label"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          :rules="fieldProps.rules"
          :model-value="fieldProps.modelValue"
          @update:model-value="fieldProps.updateValue"
          :error-messages="field.validationMessage"
        />
      </template>
    </BaseForm>

    <template #actions="{ close }">
      <BaseButton variant="text" @click="close"> Отмена </BaseButton>
    </template>
  </BaseModal>
</template>
