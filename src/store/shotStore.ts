import { create } from 'zustand';

interface ShotState {
    emptyFrame: number[];
    setEmptyFrame: (emptyFrame: number[]) => void;
}

export const useShotStore = create<ShotState>((set) => ({
    emptyFrame: [1, 2, 3, 4],
    setEmptyFrame: (emptyFrame: number[]) => set({ emptyFrame })
}));