import { ShutterButton } from './ShutterButton';
import { useStore } from '../store';
import { useEffect, useRef, useState } from 'react';

export const MainDisplay = () => {
  const { addPhoto } = useStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("카메라를 사용할 수 없습니다.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleTakePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const photoUrl = canvas.toDataURL('image/png');
        addPhoto(photoUrl);
      }
    }
  };

  return (
    <div className="aspect-4/3 bg-gray-200 relative flex items-center justify-center overflow-hidden">
      {/* Camera Viewport */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted
        className="w-full aspect-4/3 object-cover video-filter"
      />

      {/* Shutter Button Overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ShutterButton onClick={handleTakePhoto} />
      </div>
    </div>
  );
};