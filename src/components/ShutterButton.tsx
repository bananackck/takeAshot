import { IoCameraOutline } from "react-icons/io5";

interface ShutterButtonProps {
  onClick?: () => void;
}

export const ShutterButton = ({ onClick }: ShutterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-gray-800 p-4 text-white hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
      aria-label="Take photo"
    >
      <IoCameraOutline className="w-10 h-10" />
    </button>
  );
};
