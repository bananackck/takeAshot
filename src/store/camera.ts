import { create } from "zustand";

interface CameraStore {
  stream: MediaStream | null;
  camera: boolean;
  videoRefs: (HTMLVideoElement | null)[];
  cameraId: number;
  setStream: (stream: MediaStream | null) => void;
  setCamera: (camera: boolean) => void;
  assignVideoRef: (index: number, el: HTMLVideoElement | null) => void;
  setCameraId: (id: number) => void;
}

export const useCameraStore = create<CameraStore>((set, get) => ({
  stream: null,
  camera: true,
  videoRefs: [],
  cameraId: 0,
  setStream: (stream) => set({ stream }),
  setCamera: (camera) => set({ camera }),
  assignVideoRef: (index, el) => {
    const arr = get().videoRefs;
    if (arr[index] !== el) {
      arr[index] = el; // set() 호출하지 않음 (리렌더 X)
    }
  },
  setCameraId: (cameraId) => set({ cameraId }),
}));
