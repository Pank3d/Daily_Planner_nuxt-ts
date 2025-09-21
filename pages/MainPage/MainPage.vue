<script setup lang="ts">
import { ref, computed } from "vue";
import { VContainer, VRow, VCol } from "vuetify/components";

import { BaseButton } from "../../components/button";
import { BaseModal } from "../../components/modal";
import { BaseForm } from "../../components/Form";
import { BaseDatePicker } from "../../components/Form/datePicker";
import { useTaskStore, type Task } from "../../stores";

import {
  formFields,
  TaskTable,
  EditTaskModal,
  DeleteTaskModal,
  FilterByDate
} from "./tableHelpers";

const isModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isLoading = ref(false);
const editingTask = ref<Task | null>(null);
const deletingTask = ref<Task | null>(null);
const selectedDate = ref<string | null>(null);
const store = useTaskStore();

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const openEditModal = (task: Task) => {
  editingTask.value = task;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  editingTask.value = null;
};

const openDeleteModal = (task: Task) => {
  deletingTask.value = task;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  deletingTask.value = null;
};

const handleSubmit = async (formData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
  store.addTask(formData)
  closeModal()
};

const handleEditSubmit = async (formData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
  if (editingTask.value) {
    store.updateTask(editingTask.value.id, formData);
    closeEditModal();
  }
};

const handleDeleteConfirm = async (task: Task) => {
  store.deleteTask(task.id);
  closeDeleteModal();
};

const filteredTasks = computed(() => {
  if (!selectedDate.value) {
    return store.tasks;
  }

  const filterDate = new Date(selectedDate.value);
  return store.tasks.filter(task => task.date >= filterDate);
});

const handleDateFilter = (date: string | Date | null) => {
  if (date instanceof Date) {
    selectedDate.value = date.toISOString().split('T')[0];
  } else if (typeof date === 'string') {
    selectedDate.value = date;
  } else {
    selectedDate.value = null;
  }
};
</script>

<template>
  <v-container fluid class="h-screen">
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-end">
        <BaseButton color="primary" prepend-icon="mdi-plus" @click="openModal">
          Добавить
        </BaseButton>
      </v-col>
    </v-row>

    <FilterByDate @date-changed="handleDateFilter" />

    <v-row>
      <v-col cols="12">
        <h1>Daily Planner</h1>
        <TaskTable
          :tasks="filteredTasks"
          @edit-task="openEditModal"
          @delete-task="openDeleteModal"
        />
      </v-col>
    </v-row>

    <BaseModal
      v-model="isModalOpen"
      title="Добавить новую задачу"
      max-width="600px"
      @close="closeModal"
    >
      <BaseForm
        :fields="formFields"
        submit-text="Создать"
        :loading="isLoading"
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

    <!-- Модальное окно редактирования -->
    <EditTaskModal
      v-model="isEditModalOpen"
      :task="editingTask"
      :loading="isLoading"
      @close="closeEditModal"
      @submit="handleEditSubmit"
    />

    <!-- Модальное окно удаления -->
    <DeleteTaskModal
      v-model="isDeleteModalOpen"
      :task="deletingTask"
      :loading="isLoading"
      @close="closeDeleteModal"
      @confirm="handleDeleteConfirm"
    />
  </v-container>
</template>
