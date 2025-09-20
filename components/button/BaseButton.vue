<script setup lang="ts">
import { VBtn } from "vuetify/components";
import type { ButtonProps } from "./types";

const props = defineProps<ButtonProps>();
const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <VBtn
    :variant="variant"
    :color="color"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :block="block"
    :rounded="rounded"
    :elevation="elevation"
    :class="customClass"
    @click="emit('click', $event)"
  >
    <slot />
  </VBtn>
</template>
