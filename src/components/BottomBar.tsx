import { useStore } from '../store';

export const BottomBar = () => {
  const { capturedPhotos } = useStore();

  return (
    <div className="h-32 bg-white border-t border-gray-200 p-4 flex items-center gap-4 overflow-x-auto">
      {capturedPhotos.map((photo, index) => (
        <div key={index} className="h-full aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
           {/* Placeholder for actual image if we had one, or just a color block for now */}
           <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
             Photo {index + 1}
           </div>
        </div>
      ))}
      {capturedPhotos.length === 0 && (
        <div className="text-gray-400 text-sm italic">No photos taken yet</div>
      )}
    </div>
  );
};
