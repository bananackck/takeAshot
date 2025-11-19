import { create } from 'zustand';

interface AppState {
  selectedFrame: string | null;
  capturedPhotos: string[];
  setSelectedFrame: (frame: string | null) => void;
  addPhoto: (photo: string) => void;
  clearPhotos: () => void;
}

export const useStore = create<AppState>((set) => ({
  selectedFrame: null,
  capturedPhotos: [],
  setSelectedFrame: (frame) => set({ selectedFrame: frame }),
  addPhoto: (photo) => set((state) => {
    if (state.capturedPhotos.length >= 4) return state;
    return { capturedPhotos: [...state.capturedPhotos, photo] };
  }),
  clearPhotos: () => set({ capturedPhotos: [] }),
}));
