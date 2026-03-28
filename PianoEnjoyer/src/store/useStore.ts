import { create } from 'zustand';

export interface Note {
  pitch: string;
  time: number; // seconds from start
  x?: number;
  y?: number;
}

export interface KeyboardCoord {
  x: number;
  y: number;
  width?: number;
  height?: number;
  pitch?: string;
}

interface State {
  delay: number;
  fileId: string | null;
  roomId: string | null;
  setDelay: (d: number) => void;
  setFileId: (id: string) => void;
  setRoomId: (id: string) => void;
}

export const useStore = create<State>((set) => ({
  delay: 500,
  fileId: null,
  roomId: null,
  setDelay: (d) => set({ delay: d }),
  setFileId: (id) => set({ fileId: id }),
  setRoomId: (id) => set({ roomId: id }),
}));
