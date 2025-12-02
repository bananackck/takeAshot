import { usePhotoListStore } from "../store/photoStore";

interface FrameProps {
  id?: number;
  fType: string;
}
export const Frame = ({ id, fType }: FrameProps) => {
  const { capturedPhotos, setNextIndex } = usePhotoListStore();

  const src = capturedPhotos.filter((photo) => {
    return photo.frameId === id;
  })[0]?.src;

  return (
    <div
      className="relative cursor-pointer overflow-hidden"
      onClick={() => {
        setNextIndex(id);
      }}
    >
      <img className="relative z-10" src={`images/${fType}`} alt="frame pink" />
      {src && (
        <img
          className="absolute top-0 left-0 w-full h-full"
          src={src}
          alt={`frame ${id}`}
        />
      )}
    </div>
  );
};
