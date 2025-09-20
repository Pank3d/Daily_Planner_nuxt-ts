<script setup lang="ts">
import { VCheckbox } from "vuetify/components";
import { CheckboxProps } from "./types";

const props = defineProps<CheckboxProps>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>

<template>
  <v-checkbox
    :label="label"
    :disabled="disabled"
    :rules="rules"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :error-messages="errorMessages"
  />
</template>
