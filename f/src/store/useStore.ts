import { create } from 'zustand';

interface State {
  delay: number;
  fileId: string | null;
  roomId: string | null;
  setDelay: (d: number) => void;
  setFileId: (id: string) => void;
  setRoomId: (id: string) => void;
}

export const useStore = create<State>((set: (partial: Partial<State>) => void) => ({
  delay: 500,
  fileId: null,
  roomId: null,
  setDelay: (d: number) => set({ delay: d }),
  setFileId: (id: string) => set({ fileId: id }),
  setRoomId: (id: string) => set({ roomId: id })
}));
