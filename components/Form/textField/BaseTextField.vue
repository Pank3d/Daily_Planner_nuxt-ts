<script setup lang="ts">
import { VTextField } from "vuetify/components";
import type { TextFieldProps } from "./types";

const props = withDefaults(defineProps<TextFieldProps>(), {
  type: "text",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <v-text-field
    :type="type"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :rules="rules"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :error-messages="errorMessages"
    variant="outlined"
    density="comfortable"
  />
</template>
