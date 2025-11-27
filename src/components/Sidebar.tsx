interface SidebarProps {
  title: string;
  ys?: number;
  children?: React.ReactNode;
}

export const Sidebar = ({ title, ys=4, children }: SidebarProps) => {
  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className={`flex-1 overflow-y-auto space-y-${ys} pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}>
        {children}
      </div>
    </div>
  );
};
