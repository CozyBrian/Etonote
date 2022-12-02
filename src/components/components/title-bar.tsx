import React, { useState } from "react";

const TitleBar = () => {
  const [isMax, setIsMax] = useState(false);

  return (
    <div className="h-8 py-4 w-full bg-white dark:bg-zinc-800 draggable relative z-50">
      <div className="h-full flex flex-row justify-between items-center select-none ">
        <div className="absolute w-full flex justify-center dark:text-slate-300 text-slate-800 z-[51]">
          {document.title}
        </div>
        <div className="absolute px-2 controls h-full flex flex-row items-center select-none z-[52]">
          <div
            onClick={() => window.Main.closeWindow()}
            className="h-3 w-3 m-1 rounded-full inline-block bg-[#ff4c49] hover:bg-[#d52a27]"
          ></div>
          <div
            onClick={() => window.Main.minimizeWindow()}
            className="h-3 w-3 m-1 rounded-full inline-block bg-[#FFBD44] hover:bg-[#d79a2a]"
          ></div>
          <div
            onClick={() => {
              window.Main.maximizeWindow(isMax);
              setIsMax(!isMax);
            }}
            className="h-3 w-3 m-1 rounded-full inline-block bg-[#00CA4E] hover:bg-[#00a73c]"
          ></div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TitleBar;
