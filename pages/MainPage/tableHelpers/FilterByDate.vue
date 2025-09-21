<script setup lang="ts">
import { ref} from "vue";
import { VRow, VCol } from "vuetify/components";
import { BaseDatePicker } from "../../../components/Form/datePicker";
import { BaseButton } from "../../../components/button";

const emit = defineEmits<{
  dateChanged: [date: string | Date | null];
}>();

const selectedDate = ref<string | Date | null>(null);

const handleDateChange = (date: string | Date | null): void => {
  selectedDate.value = date;
  emit("dateChanged", date);
};

const clearFilter = () => {
  selectedDate.value = null;
  emit('dateChanged', null);
};
</script>

<template>
  <v-row class="mb-4">
    <v-col cols="12" md="4">
      <BaseDatePicker
        v-model="selectedDate"
        label="Фильтр по дате"
        placeholder="Выберите дату"
        clearable
        @update:model-value="(value) => handleDateChange(value)"
      />
    </v-col>
    <v-col cols="12" md="2" class="d-flex align-center">
      <BaseButton
        v-if="selectedDate"
        variant="outlined"
        color="secondary"
        @click="clearFilter"
      >
        Сбросить фильтр
      </BaseButton>
    </v-col>
  </v-row>
</template>
