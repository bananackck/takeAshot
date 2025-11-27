import { usePhotoListStore } from '../store/photoStore';

export const Frame = ({idx}: {idx?: number}) => {
    const { capturedPhotos } = usePhotoListStore();

    const src = capturedPhotos.filter((photo)=>{
        return photo.selectedIdx ===idx;
    })[0]?.src;

    return (
        <div className="relative cursor-pointer overflow-hidden ">
            <img className="relative z-10" src="images/pink-cover.png" alt="frame pink" />
            {/* {idx && capturedPhotos[idx-1] && capturedPhotos[idx-1].selectedIdx !== undefined && <img className="absolute top-0 left-0 w-full h-full object-cover" src={capturedPhotos[idx-1].src} alt={`frame ${idx}`} />} */}
            
            {src && <img className="video-filter absolute top-0 left-0 w-full h-full object-cover" src={src} alt={`frame ${idx}`} />}
        </div>
    );
};