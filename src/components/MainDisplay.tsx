import { ShutterButton } from './ShutterButton';
import { useStore } from '../store';

export const MainDisplay = () => {
  const { addPhoto } = useStore();

  const handleTakePhoto = () => {
    // Simulate taking a photo by adding a placeholder
    addPhoto('placeholder-image-url');
  };

  return (
    <div className="flex-1 bg-gray-200 relative flex items-center justify-center">
      {/* Camera Viewport Placeholder */}
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Camera Preview
      </div>

      {/* Shutter Button Overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ShutterButton onClick={handleTakePhoto} />
      </div>
    </div>
  );
};
