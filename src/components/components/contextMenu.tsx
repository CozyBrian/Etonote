import React from "react";

type Props = {
  id?: string;
  x: number;
  y: number;
};

const ContextMenu = ({ id, x, y }: Props) => {
  const style = () => {
    return { top: y, left: x };
  };
  return (
    <div
      style={style()}
      className={`absolute flex flex-col w-32 p-1 bg-slate-100 z-50 rounded-xl gap-1`}
    >
      <div
        onClick={() => console.log(id)}
        className="flex flex-row h-8 w-full bg-slate-200/80 hover:bg-slate-300/80 active:bg-slate-300 text-black pl-2 p-2 items-center rounded-lg"
      >
        edit
      </div>
      <div className="flex flex-row h-8 w-full bg-slate-200/80 hover:bg-slate-300/80 active:bg-slate-300 text-black pl-2 p-2 items-center rounded-lg">
        copy
      </div>
      <div className="flex flex-row h-8 w-full bg-slate-200/80 hover:bg-slate-300/80 active:bg-slate-300 text-black pl-2 p-2 items-center rounded-lg">
        paste
      </div>
    </div>
  );
};

export default ContextMenu;
