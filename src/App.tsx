import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MainDisplay } from './components/MainDisplay';
import { BottomBar } from './components/BottomBar';

function App() {
  return (
    <div className="flex flex-col h-screen bg-white font-sans text-gray-900">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar title="프레임 선택">
          {/* Placeholder items for frame selection */}
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative">
          <MainDisplay />
          
          {/* Bottom Bar for captured photos */}
          <BottomBar />
        </div>

        {/* Right Sidebar */}
        <Sidebar title="프레임 선택">
           {/* Placeholder items for frame selection */}
           <div className="h-24 bg-gray-200 rounded-md"></div>
           <div className="h-24 bg-gray-200 rounded-md"></div>
           <div className="h-24 bg-gray-200 rounded-md"></div>
           <div className="h-24 bg-gray-200 rounded-md"></div>
        </Sidebar>
      </div>
    </div>
  );
}

export default App;
