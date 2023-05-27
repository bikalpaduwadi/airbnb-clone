import { create } from 'zustand';

import ModalStore from '@/models/ModalStore';

const useRentModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
