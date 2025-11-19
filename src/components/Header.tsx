import logo from '../assets/logo.png';

export const Header = () => {
  return (
    <header className="flex items-center justify-start p-4 bg-white border-b border-gray-200">
      <img src={logo} alt="take A shot" className="h-12 object-contain" />
    </header>
  );
};
