export interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  width?: string | number;
  align?: "start" | "center" | "end";
  formatter?: (value: any) => string;
}

export interface TableAction {
  icon: string;
  color?: string;
  tooltip?: string;
  handler: (item: any) => void;
  show?: (item: any) => boolean;
}

export interface TableProps {
  items: any[];
  columns: TableColumn[];
  actions?: TableAction[];
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

export interface TableEmits {
  "update:selected": [items: any[]];
  "item:click": [item: any];
  "update:sortBy": [sortBy: any[]];
  "update:page": [page: number];
  "update:itemsPerPage": [itemsPerPage: number];
}