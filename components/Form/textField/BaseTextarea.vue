<script setup lang="ts">
  import { VTextarea } from "vuetify/components";
  import type { TetxAreaProps } from "./types";

  const props = withDefaults(defineProps<TetxAreaProps>(), {
    rows: 3,
  });

  const emit = defineEmits<{
    "update:modelValue": [value: string];
  }>();
</script>

<template>
  <v-textarea
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :rules="rules"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :error-messages="errorMessages"
    :rows="rows"
    variant="outlined"
    density="comfortable"
  />
</template>
