import { create } from "zustand";

export interface PhotoState {
  idx: number;
  src: string;
  frameId?: number;
  setFrameId: (idx: number | undefined) => void;
}

interface PhotoListState {
  capturedPhotos: PhotoState[];
  nextIndex: number | undefined;
  setNextIndex: (idx: number | undefined) => void;
  addPhoto: (photo: { idx: number; src: string; frameId?: number }) => void;
  clearPhotos: () => void;
}

export const usePhotoListStore = create<PhotoListState>((set) => ({
  capturedPhotos: [],
  nextIndex: undefined,
  setNextIndex: (idx: number | undefined) => set({ nextIndex: idx }),
  addPhoto: (photo: { idx: number; src: string; frameId?: number }) =>
    set((prev) => {
      const newPhoto: PhotoState = {
        ...photo,
        frameId: photo.frameId,
        setFrameId: (idx: number | undefined) =>
          set((state) => ({
            capturedPhotos: state.capturedPhotos.map((p) =>
              p.idx === photo.idx ? { ...p, frameId: idx } : p
            ),
          })),
      };
      return { capturedPhotos: [...prev.capturedPhotos, newPhoto] };
    }),
  clearPhotos: () => set({ capturedPhotos: [] }),
}));
