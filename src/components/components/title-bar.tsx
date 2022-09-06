import React from "react";

const TitleBar = () => {
  return (
    <div className="h-8 w-full bg-slate-800">
      <div className="h-full flex flex-row justify-between items-center select-none draggable relative">
        <div></div>
        <div className="absolute left-1/2 -translate-y-1/2 top-4 text-slate-300">
          {document.title}
        </div>
        <div className="controls h-full flex flex-row select-none">
          <div className="h-full w-11 flex items-center text-center justify-center cursor-pointer hover:bg-slate-700 active:bg-slate-500 text-slate-300 duration-100">
            <img
              src={require("../../assets/images/subtract.png")}
              alt="minimize"
              className="h-4 w-4"
            />
          </div>
          <div className="h-full w-11 flex items-center text-2xl text-center justify-center cursor-pointer hover:bg-slate-700 active:bg-slate-500 text-slate-300 duration-100">
            <img
              src={require("../../assets/images/square.png")}
              alt="maximize"
              className="h-3 w-3"
            />
          </div>
          <div className="h-full w-11 flex items-center text-center justify-center cursor-pointer hover:bg-slate-700 active:bg-red-600 text-slate-300 duration-100">
            <img
              src={require("../../assets/images/close.png")}
              alt="close"
              className="h-3 w-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
