<script setup lang="ts">
import { ref, computed } from "vue";
import { VTextField, VMenu, VDatePicker } from "vuetify/components";

import type { DatePickerProps } from "./types";

const props = withDefaults(defineProps<DatePickerProps>(), {
  format: 'DD.MM.YYYY',
  disablePastDates: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string | Date | null];
}>();

const menu = ref(false);

const formattedValue = computed(() => {
  if (!props.modelValue) return '';

  if (props.modelValue instanceof Date) {
    return formatDate(props.modelValue);
  }

  return props.modelValue;
});

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  switch (props.format) {
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD.MM.YYYY':
    default:
      return `${day}.${month}.${year}`;
  }
};

const handleDateSelect = (date: string) => {
  const selectedDate = new Date(date);
  emit('update:modelValue', selectedDate);
  menu.value = false;
};

const closeMenu = () => {
  menu.value = false;
};

const computedMinDate = computed(() => {
  if (props.disablePastDates) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return props.minDate ? new Date(Math.max(today.getTime(), new Date(props.minDate).getTime())) : today;
  }
  return props.minDate;
});
</script>

<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ props: activatorProps }">
      <v-text-field
        v-bind="activatorProps"
        :model-value="formattedValue"
        :label="label"
        :placeholder="placeholder"
        :disabled="disabled"
        :rules="rules"
        :error-messages="errorMessages"
        :prepend-inner-icon="prependIcon || 'mdi-calendar'"
        readonly
        variant="outlined"
        density="comfortable"
        @click="menu = true"
      />
    </template>

    <v-date-picker
      :model-value="modelValue"
      @update:model-value="handleDateSelect"
      @click:cancel="closeMenu"
      @click:save="closeMenu"
      :min="computedMinDate"
      :max="maxDate"
      :disabled-dates="disabledDates"
      :locale="locale"
      color="primary"
      header-color="primary"
      show-adjacent-months
    />
  </v-menu>
</template>