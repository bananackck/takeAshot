import { useCameraStore } from "../store/camera";

export function useCamera() {
  const {
    stream,
    camera,
    videoRefs,
    cameraId,
    setStream,
    setCamera,
    setCameraId,
  } = useCameraStore();

  function cameraOn() {
    cameraOff();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("사용할 수 있는 카메라가 없습니다.");
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          const video = videoRefs[cameraId];
          if (video) {
            video.srcObject = mediaStream;
            video.play();
          }
        })
        .catch((err) => console.error(err));
    }
  }

  function cameraOff() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      const video: HTMLVideoElement | null =
        document.querySelector("#cameraview");
      if (video) {
        video.srcObject = null;
      }
    }
  }

  function cameraHandle() {
    const next = !camera;
    if (next) {
      cameraOn();
    } else {
      cameraOff();
    }
    setCamera(next);
  }

  function changeCameraHandle() {
    if (!camera) return;
    const next = (cameraId + 1) % 3;
    setCameraId(next);
    cameraOn();
  }

  return {
    cameraOn,
    cameraOff,
    cameraHandle,
    changeCameraHandle,
  };
}
