<script setup lang="ts">
  import {
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
  } from "vuetify/components";
  import type { BaseModalProps } from "./types";
  import BaseButton from "../button/BaseButton.vue";

  const props = withDefaults(defineProps<BaseModalProps>(), {
    maxWidth: "500px",
    persistent: false,
    scrollable: false,
    fullscreen: false,
    hideOverlay: false,
    closeOnBackClick: true,
    showCloseButton: true,
  });

  const emit = defineEmits<{
    "update:modelValue": [value: boolean];
    close: [];
    confirm: [];
  }>();

  const closeModal = () => {
    emit("update:modelValue", false);
    emit("close");
  };

  const confirmAction = () => {
    emit("confirm");
  };
</script>

<template>
  <VDialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :max-width="maxWidth"
    :persistent="persistent"
    :scrollable="scrollable"
    :fullscreen="fullscreen"
    :hide-overlay="hideOverlay"
    :close-on-back="closeOnBackClick"
    :class="customClass"
  >
    <v-card>
      <v-card-title
        v-if="title || showCloseButton"
        class="d-flex justify-space-between align-center"
      >
        <span>{{ title }}</span>
        <BaseButton
          v-if="showCloseButton"
          variant="text"
          size="small"
          @click="closeModal"
          prepend-icon="mdi-close"
        />
      </v-card-title>

      <v-card-text v-if="$slots.default" :class="{ 'pt-0': !title }">
        <slot />
      </v-card-text>

      <v-card-actions v-if="$slots.actions" class="justify-end">
        <slot name="actions" :close="closeModal" :confirm="confirmAction" />
      </v-card-actions>
    </v-card>
  </VDialog>
</template>
