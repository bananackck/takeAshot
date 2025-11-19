import { useStore } from '../store';

export const BottomBar = () => {
  const { capturedPhotos } = useStore();

  return (
    <div className="h-32 bg-white border-t border-gray-200 p-4 flex items-center gap-4 overflow-x-auto">
      {capturedPhotos.map((photo, index) => (
        <div key={index} className="h-full aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-300 relative group">
           <img 
             src={photo} 
             alt={`Captured photo ${index + 1}`} 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
        </div>
      ))}
      {capturedPhotos.length === 0 && (
        <div className="text-gray-400 text-sm italic">No photos taken yet</div>
      )}
    </div>
  );
};
