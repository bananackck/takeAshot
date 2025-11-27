import { create } from 'zustand';

interface PhotoState {
  idx: number;
  src: string;
  selectedIdx?: number;
  setSelectedIdx: (idx: number|undefined) => void;
}

interface PhotoListState {
  capturedPhotos: PhotoState[];
  addPhoto: (photo: {idx: number, src: string}) => void;
  clearPhotos: () => void;
}

export const usePhotoStore = create<PhotoState>((set) => ({
  idx: 0,
  src: '',
  selectedIdx: undefined,
  setSelectedIdx: (idx: number|undefined) => set({ selectedIdx: idx }),
}));

export const usePhotoListStore = create<PhotoListState>((set) => ({
  capturedPhotos: [],
  addPhoto: (photo: {idx: number, src: string}) => set((prev) => {
    const newPhoto: PhotoState = {
      ...photo,
      selectedIdx: undefined,
      setSelectedIdx: (idx: number|undefined) => set((state) => ({
        capturedPhotos: state.capturedPhotos.map(p => 
          p.idx === photo.idx ? { ...p, selectedIdx: idx } : p
        )
      }))
    };
    return { capturedPhotos: [...prev.capturedPhotos, newPhoto ] };
  }),
  clearPhotos: () => set({ capturedPhotos: [] }),
}));
