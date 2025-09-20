export interface BaseModalProps {
  modelValue: boolean;
  title?: string;
  maxWidth?: string | number;
  persistent?: boolean;
  scrollable?: boolean;
  fullscreen?: boolean;
  hideOverlay?: boolean;
  closeOnBackClick?: boolean;
  showCloseButton?: boolean;
  customClass?: string;
}
