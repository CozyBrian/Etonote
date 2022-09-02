import React from "react";

const SideBarItem = () => {
  return (
    <div className="w-full flex flex-row hover:bg-zinc-100 active:bg-slate-200 h-12 rounded-xl p-2 my-1 items-center duration-100 select-none justify-between">
      <div className="flex flex-row">
        <div className="h-6 w-6 bg-slate-60 rounded-md mr-3 mx-2 items-center text-md justify-center">
          🏠
        </div>
        Home
      </div>
      <div className="text-sm text-gray-600 rounded-md bg-zinc-100 p-0.5 mx-2">
        12
      </div>
    </div>
  );
};

export default SideBarItem;
