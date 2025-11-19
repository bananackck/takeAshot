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
    return { capturedPhotos: [...state.capturedPhotos, photo] };
  }),
  clearPhotos: () => set({ capturedPhotos: [] }),
}));
