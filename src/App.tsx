import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MainDisplay } from "./components/MainDisplay";
import { BottomBar } from "./components/BottomBar";
import { Frame } from "./components/Frame";
import { useRef } from "react";
import { handleDownload } from "./utils/handleDownload";
import { pinkFr } from "./utils/imageDict";

function App() {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-gray-900">
      <Header />

      <div className="flex flex-1 overflow-hidden p-4">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-24"></div>
          <MainDisplay />

          {/* Bottom Bar for captured photos */}
          <BottomBar />
        </div>

        {/* Right Sidebar */}
        <Sidebar title="프레임" ys={0}>
          <div ref={divRef}>
            {pinkFr.map((fType, index) => (
              <Frame key={index} id={index + 1} fType={fType} />
            ))}
          </div>
          <button
            className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-md"
            onClick={() => {
              handleDownload(divRef);
            }}
          >
            다운로드
          </button>
        </Sidebar>

        <Sidebar title="프레임 선택">
          {/* Placeholder items for frame selection */}
          <div className="relative cursor-pointer overflow-hidden">
            <img
              className="relative z-10"
              src="images/pink-cover.png"
              alt="frame pink"
            />
          </div>
        </Sidebar>
      </div>
    </div>
  );
}

export default App;
