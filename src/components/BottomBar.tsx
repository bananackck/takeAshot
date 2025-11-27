import { usePhotoListStore } from '../store/photoStore';

export const BottomBar = () => {
  const { capturedPhotos } = usePhotoListStore();

  const handlePhotoClick = (photo: any) => {
    if (photo.selectedIdx !== undefined) {
      photo.setSelectedIdx(undefined);
    } else {
      const usedIndices = capturedPhotos
        .map(p => p.selectedIdx)
        .filter((idx): idx is number => idx !== undefined);
      
      const nextIndex = [1, 2, 3, 4].find(idx => !usedIndices.includes(idx));
      
      if (nextIndex !== undefined) {
        photo.setSelectedIdx(nextIndex);
      }
    }
  };

  return (
    <div className="h-48 w-full bg-white border-t border-gray-200 p-4 flex items-center gap-4 overflow-x-auto">
      {capturedPhotos.map((photo, index) => (
        <div key={index} 
        className="cursor-pointer h-full min-w-[120px] aspect-4/3 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-300 relative group"
        onClick={() => handlePhotoClick(photo)}
        >
          <img 
            src={photo.src} 
            alt={`Captured photo ${photo.idx + 1}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
          { photo.selectedIdx && (
            <div className="absolute top-2 right-2 text-white font-bold rounded-full bg-black w-8 h-8 flex items-center justify-center z-10">{photo.selectedIdx}</div>
          )}
        </div>
      ))}
      {capturedPhotos.length === 0 && (
        <div className="text-gray-400 text-md italic">No photos taken yet</div>
      )}
    </div>
  );
};
