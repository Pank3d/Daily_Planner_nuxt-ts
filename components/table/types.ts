export interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  width?: string | number;
  align?: "start" | "center" | "end";
  formatter?: (value: unknown) => string;
}

export interface TableAction<T = unknown> {
  icon: string;
  color?: string;
  tooltip?: string;
  handler: (item: T) => void;
  show?: (item: T) => boolean;
}

export interface TableProps<T = unknown> {
  items: T[];
  columns: TableColumn[];
  actions?: TableAction<T>[];
  loading?: boolean;
  itemsPerPage?: number;
  showSelect?: boolean;
  multiSort?: boolean;
  noDataText?: string;
  loadingText?: string;
  customClass?: string;
  height?: string | number;
  fixedHeader?: boolean;
  showFooter?: boolean;
  itemValue?: string;
}

export interface SortByItem {
  key: string;
  order?: "asc" | "desc";
}

export interface TableEmits<T = unknown> {
  "update:selected": [items: T[]];
  "item:click": [item: T];
  "update:sortBy": [sortBy: SortByItem[]];
  "update:page": [page: number];
  "update:itemsPerPage": [itemsPerPage: number];
}
