<script setup lang="ts">
  import { ref } from "vue";
  import { VForm } from "vuetify/components";

  import type { FormField, FormProps, ValidationRule } from "./types";
  import BaseTextField from "./textField/BaseTextField.vue";
  import BaseTextarea from "./textField/BaseTextarea.vue";
  import BaseSelect from "./select/BaseSelect.vue";
  import BaseCheckbox from "./checkbox/BaseCheckbox.vue";
  import { BaseDatePicker } from "./datePicker";

  const props = defineProps<FormProps>();

  const emit = defineEmits(["submit", "fieldChange"]);

  const form = ref<VForm | null>(null);
  const valid = ref(false);
  const fieldValues = ref<Record<string, unknown>>({});

  // Initialize field values
  props.fields.forEach(field => {
    fieldValues.value[field.name] = field.value;
  });

  const getValidationRules = (field: FormField): ValidationRule[] => {
    const rules: ValidationRule[] = [];

    if (field.required) {
      rules.push((value: unknown): boolean | string => {
        if (field.type === "checkbox") {
          return value === true || "This field is required";
        }
        if (field.type === "datepicker") {
          return !!value || "This field is required";
        }
        return (
          (value && typeof value === "string" && value.length > 0) ||
          (Array.isArray(value) && value.length > 0) ||
          "This field is required"
        );
      });
    }

    if (field.type === "email") {
      rules.push((value: unknown) => {
        if (!value || typeof value !== "string") return true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value) || "Please enter a valid email address";
      });
    }

    if (field.validationRules) {
      rules.push(...field.validationRules);
    }

    return rules;
  };

  const handleFieldChange = (fieldName: string, value: unknown) => {
    fieldValues.value[fieldName] = value;
    emit("fieldChange", fieldName, value);
  };

  const handleSubmit = async () => {
    if (form.value) {
      const { valid } = await form.value.validate();
      if (valid) {
        emit("submit", { ...fieldValues.value });
      }
    }
  };

  const resetForm = () => {
    if (form.value) {
      form.value.reset();
    }
  };

  const resetValidation = () => {
    if (form.value) {
      form.value.resetValidation();
    }
  };

  defineExpose({
    resetForm,
    resetValidation,
    validate: () => form.value?.validate(),
  });
</script>

<template>
  <VForm ref="form" v-model="valid" @submit.prevent="handleSubmit">
    <div v-for="field in fields" :key="field.name" class="mb-4">
      <!-- Text Input Fields -->
      <BaseTextField
        v-if="['text', 'email', 'password'].includes(field.type)"
        :type="field.type as 'text' | 'email' | 'password'"
        :label="field.label"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
        :rules="getValidationRules(field)"
        :model-value="fieldValues[field.name] as string"
        @update:model-value="handleFieldChange(field.name, $event)"
        :error-messages="field.validationMessage"
      />

      <!-- Textarea -->
      <BaseTextarea
        v-else-if="field.type === 'textarea'"
        :label="field.label"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
        :rules="getValidationRules(field)"
        :model-value="fieldValues[field.name] as string"
        @update:model-value="handleFieldChange(field.name, $event)"
        :error-messages="field.validationMessage"
      />

      <!-- Select -->
      <BaseSelect
        v-else-if="field.type === 'select'"
        :label="field.label"
        :items="field.options || []"
        :disabled="field.disabled"
        :rules="getValidationRules(field)"
        :model-value="fieldValues[field.name]"
        @update:model-value="handleFieldChange(field.name, $event)"
        :error-messages="field.validationMessage"
      />

      <!-- DatePicker -->
      <BaseDatePicker
        v-else-if="field.type === 'datepicker'"
        :label="field.label"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
        :rules="getValidationRules(field)"
        :model-value="fieldValues[field.name] as string | Date | null"
        @update:model-value="handleFieldChange(field.name, $event)"
        :error-messages="field.validationMessage"
        :disable-past-dates="field.disablePastDates"
        :format="field.format"
        :min-date="field.minDate"
        :max-date="field.maxDate"
      />

      <!-- Checkbox -->
      <BaseCheckbox
        v-else-if="field.type === 'checkbox'"
        :label="field.label"
        :disabled="field.disabled"
        :rules="getValidationRules(field)"
        :model-value="fieldValues[field.name] as boolean | null"
        @update:model-value="handleFieldChange(field.name, $event)"
        :error-messages="field.validationMessage"
      />
    </div>

    <div class="d-flex justify-end mt-6">
      <BaseButton
        type="submit"
        color="primary"
        :loading="loading"
        :disabled="!valid"
        @click="handleSubmit"
      >
        {{ submitText }}
      </BaseButton>
    </div>
  </VForm>
</template>
