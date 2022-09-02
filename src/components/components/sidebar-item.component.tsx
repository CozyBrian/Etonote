import React from "react";
import { SidebarItem } from "../../@types";

const SideBarItem = ({
  title = "Home",
  icon = "🏠",
  number = 1,
}: SidebarItem) => {
  return (
    <div
      onClick={() => console.log(title)}
      className="w-full flex flex-row hover:bg-zinc-100 active:bg-slate-200 h-12 rounded-xl p-2 my-1 items-center duration-100 select-none justify-between"
    >
      <div className="flex flex-row">
        <div className="h-6 w-6 bg-slate-60 rounded-md mr-3 mx-2 items-center text-md justify-center">
          {icon}
        </div>
        {title}
      </div>
      <div className="text-sm text-gray-600 rounded-md bg-zinc-100 p-0.5 mx-2">
        {number}
      </div>
    </div>
  );
};

export default SideBarItem;
