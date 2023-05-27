export default interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
