import React, { useState } from "react";

const TitleBar = () => {
  const [isMax, setIsMax] = useState(false);

  return (
    <div className="h-8 w-full bg-slate-800">
      <div className="h-full flex flex-row justify-between items-center select-none draggable relative">
        <div className="controls h-full flex ml-0.5 flex-row items-center select-none">
          <div
            onClick={() => window.Main.closeWindow()}
            style={{ backgroundColor: "#ff4c49" }}
            className="h-3 w-3 m-1 rounded-full inline-block"> 
          </div>
          <div
            onClick={() => window.Main.minimizeWindow()}
            style={{ backgroundColor: "#FFBD44" }}
            className="h-3 w-3 m-1 rounded-full inline-block">            
          </div>
          <div
            onClick={() => {
              window.Main.maximizeWindow(isMax);
              setIsMax(!isMax);
            }}
            style={{ backgroundColor: "#00CA4E" }}
            className="h-3 w-3 m-1 rounded-full inline-block">
          </div>
        </div>
        <div className="absolute left-1/2 -translate-y-1/2 top-4 text-slate-300">
          {document.title}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TitleBar;
