import React, { useState } from "react";

import subtract from "../../assets/images/subtract.png";
import maximize from "../../assets/images/square.png";
import unmaximize from "../../assets/images/unmaximize.png";
import close from "../../assets/images/close.png";

const TitleBar = () => {
  const [isMax, setIsMax] = useState(false);

  return (
    <div className="h-8 w-full bg-slate-800">
      <div className="h-full flex flex-row justify-between items-center select-none draggable relative">
        <div></div>
        <div className="absolute left-1/2 -translate-y-1/2 top-4 text-slate-300">
          {document.title}
        </div>
        <div className="controls h-full flex flex-row select-none">
          <div
            onClick={() => window.Main.minimizeWindow()}
            className="h-full w-11 flex items-center text-center justify-center cursor-pointer hover:bg-slate-700 active:bg-slate-500 text-slate-300 duration-100"
          >
            <img src={subtract} alt="minimize" className="h-4 w-4" />
          </div>
          <div
            onClick={() => {
              window.Main.maximizeWindow(isMax);
              setIsMax(!isMax);
            }}
            className="h-full w-11 flex items-center text-2xl text-center justify-center cursor-pointer hover:bg-slate-700 active:bg-slate-500 text-slate-300 duration-100"
          >
            <img
              src={isMax ? unmaximize : maximize}
              alt="maximize"
              className="h-3 w-3 rotate-180"
            />
          </div>
          <div
            onClick={() => window.Main.closeWindow()}
            className="h-full w-11 flex items-center text-center justify-center cursor-pointer hover:bg-slate-700 active:bg-red-600 text-slate-300 duration-100"
          >
            <img src={close} alt="close" className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
