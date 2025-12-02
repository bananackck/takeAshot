import { ShutterButton } from "./ShutterButton";
import { usePhotoListStore } from "../store/photoStore";
import { useEffect, useRef, useState } from "react";
import { pinkFr } from "../utils/imageDict";

export const MainDisplay = () => {
  const { addPhoto, nextIndex, setNextIndex } = usePhotoListStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhotoIdx, setCapturedPhotoIdx] = useState<number>(0);
  const [shotCnt, setShotCnt] = useState<number>(0);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setCapturedPhotoIdx(0);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("카메라를 사용할 수 없습니다.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleTakePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      try {
        if (ctx) {
          ctx.filter = "brightness(1.2) hue-rotate(-10deg) saturate(0.9)";
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(videoRef.current, 0, 0);
        }
        const photoUrl = canvas.toDataURL("image/png");
        addPhoto({
          idx: capturedPhotoIdx,
          src: photoUrl,
          frameId: shotCnt < 4 ? shotCnt + 1 : undefined,
        });
        if (shotCnt < 4) {
          const newShotCnt = shotCnt + 1;
          setShotCnt(newShotCnt);
          // If 4 photos are taken, there is no next index.
          setNextIndex(newShotCnt < 4 ? newShotCnt + 1 : undefined);
        }
        setCapturedPhotoIdx(capturedPhotoIdx + 1);
      } catch (err) {
        console.error("Error taking photo:", err);
        alert("사진을 저장할 수 없습니다.");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Camera Viewport */}
      <div className="relative w-full max-w-[800px] aspect-4/3">
        <img
          className="absolute top-0 left-0 w-full h-full z-10"
          src={`images/${pinkFr[nextIndex ? nextIndex - 1 : 0]}`}
          alt="frame pink"
        />
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-full object-cover video-filter"
        />
      </div>

      {/* Shutter Button Overlay */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <ShutterButton onClick={handleTakePhoto} />
      </div>
    </div>
  );
};
