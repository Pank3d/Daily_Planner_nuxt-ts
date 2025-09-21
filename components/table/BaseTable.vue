<script setup lang="ts">
import { computed, ref } from "vue";
import { VDataTable, VBtn, VIcon, VTooltip } from "vuetify/components";
import type { TableProps, TableEmits, TableColumn, TableAction, SortByItem } from "./types";

const props = withDefaults(defineProps<TableProps<unknown>>(), {
  loading: false,
  itemsPerPage: 10,
  showSelect: false,
  multiSort: false,
  noDataText: "Нет данных",
  loadingText: "Загрузка...",
  showFooter: true,
  itemValue: "id",
});

const emit = defineEmits<TableEmits<unknown>>();

const selected = ref<unknown[]>([]);
const sortBy = ref<SortByItem[]>([]);
const page = ref(1);

const headers = computed(() => {
  const baseHeaders = props.columns.map((col: TableColumn) => ({
    title: col.title,
    key: col.key,
    sortable: col.sortable ?? true,
    width: col.width,
    align: col.align || "start",
  }));

  if (props.actions && props.actions.length > 0) {
    baseHeaders.push({
      title: "Действия",
      key: "actions",
      sortable: false,
      width: props.actions.length * 50,
      align: "center" as const,
    });
  }

  return baseHeaders;
});

const handleUpdateSelected = (items: unknown[]) => {
  selected.value = items;
  emit("update:selected", items);
};

const handleItemClick = (event: unknown, item: { item: unknown }) => {
  emit("item:click", item.item);
};

const handleUpdateSortBy = (newSortBy: SortByItem[]) => {
  sortBy.value = newSortBy;
  emit("update:sortBy", newSortBy);
};

const handleUpdatePage = (newPage: number) => {
  page.value = newPage;
  emit("update:page", newPage);
};

const handleUpdateItemsPerPage = (newItemsPerPage: number) => {
  emit("update:itemsPerPage", newItemsPerPage);
};

const formatCellValue = (item: Record<string, unknown>, column: TableColumn) => {
  const value = item[column.key];
  return column.formatter ? column.formatter(value) : value;
};

const getVisibleActions = (item: unknown) => {
  return props.actions?.filter(action => !action.show || action.show(item)) || [];
};
</script>

<template>
  <VDataTable
    v-model="selected"
    v-model:sort-by="sortBy"
    v-model:page="page"
    :headers="headers"
    :items="items"
    :loading="loading"
    :items-per-page="itemsPerPage"
    :show-select="showSelect"
    :multi-sort="multiSort"
    :no-data-text="noDataText"
    :loading-text="loadingText"
    :class="customClass"
    :height="height"
    :fixed-header="fixedHeader"
    :show-footer="showFooter"
    :item-value="itemValue"
    @click:row="handleItemClick"
    @update:selected="handleUpdateSelected"
    @update:sort-by="handleUpdateSortBy"
    @update:page="handleUpdatePage"
    @update:items-per-page="handleUpdateItemsPerPage"
  >
    <!-- Custom cell content -->
    <template
      v-for="column in columns"
      :key="column.key"
      #[`item.${column.key}`]="{ item }"
    >
      <slot
        :name="`item.${column.key}`"
        :item="item"
        :value="item[column.key]"
        :formatted-value="formatCellValue(item, column)"
      >
        {{ formatCellValue(item, column) }}
      </slot>
    </template>

    <!-- Actions column -->
    <template v-if="actions && actions.length > 0" #item.actions="{ item }">
      <div class="d-flex justify-center">
        <template v-for="action in getVisibleActions(item)" :key="action.icon">
          <VTooltip v-if="action.tooltip" location="top">
            <template #activator="{ props: tooltipProps }">
              <VBtn
                v-bind="tooltipProps"
                :icon="action.icon"
                :color="action.color"
                size="small"
                variant="text"
                @click.stop="action.handler(item)"
              />
            </template>
            <span>{{ action.tooltip }}</span>
          </VTooltip>
          <VBtn
            v-else
            :icon="action.icon"
            :color="action.color"
            size="small"
            variant="text"
            @click.stop="action.handler(item)"
          />
        </template>
      </div>
    </template>

    <!-- Custom header slots -->
    <template
      v-for="column in columns"
      :key="`header.${column.key}`"
      #[`header.${column.key}`]="{ column: headerColumn }"
    >
      <slot
        :name="`header.${column.key}`"
        :column="headerColumn"
      >
        {{ headerColumn.title }}
      </slot>
    </template>

    <!-- Footer slot -->
    <template #bottom>
      <slot name="footer" />
    </template>

    <!-- No data slot -->
    <template #no-data>
      <slot name="no-data">
        <div class="text-center pa-4">
          <VIcon size="64" color="grey-lighten-1">mdi-database-off</VIcon>
          <div class="text-h6 mt-2">{{ noDataText }}</div>
        </div>
      </slot>
    </template>

    <!-- Loading slot -->
    <template #loading>
      <slot name="loading">
        <div class="text-center pa-4">
          <VIcon size="64" color="primary">mdi-loading mdi-spin</VIcon>
          <div class="text-h6 mt-2">{{ loadingText }}</div>
        </div>
      </slot>
    </template>
  </VDataTable>
</template>