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

type SetCurrentTimeAction = number | ((prev: number) => number);

type SetDelayAction = number | ((prev: number) => number);

interface State {
  delay: number; // milliseconds
  notes: Note[];
  currentTime: number;
  keyboardCoords: KeyboardCoord[];
  setDelay: (d: SetDelayAction) => void;
  setNotes: (n: Note[]) => void;
  setCurrentTime: (t: SetCurrentTimeAction) => void;
  setKeyboardCoords: (coords: KeyboardCoord[]) => void;
}

export const useStore = create<State>((set) => ({
  delay: 0,
  notes: [],
  currentTime: 0,
  keyboardCoords: [],
  setDelay: (d) =>
    set((state) => ({
      delay: typeof d === 'function' ? d(state.delay) : d,
    })),
  setNotes: (n) => set({ notes: n }),
  setCurrentTime: (t) =>
    set((state) => ({
      currentTime: typeof t === 'function' ? t(state.currentTime) : t,
    })),
  setKeyboardCoords: (coords) => set({ keyboardCoords: coords }),
}));
