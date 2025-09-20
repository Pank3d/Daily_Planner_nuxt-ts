<script setup lang="ts">
import { VSelect } from "vuetify/components";
import type { SelectProps } from "./types";

const props = defineProps<SelectProps>();

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();
</script>

<template>
  <v-select
    :label="label"
    :items="items"
    item-title="label"
    item-value="value"
    :disabled="disabled"
    :rules="rules"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :error-messages="errorMessages"
    variant="outlined"
    density="comfortable"
  />
</template>
