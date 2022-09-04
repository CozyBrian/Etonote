import React from "react";
import { action } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SidebarItem } from "../../@types";

const SideBarItem = ({
  title = "Home",
  icon = "🏠",
  number = 1,
  id = "",
}: SidebarItem) => {
  const appState = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const setTab = (tabName: string) => {
    return dispatch(action.app.setSelectedTab(tabName));
  };

  const isSelected = appState.selectedTab === id;

  return (
    <div
      onClick={() => setTab(id)}
      className={`w-full z-20 flex flex-row ${
        isSelected
          ? "bg-slate-400/30 [&>div:nth-child(2)]:bg-slate-300 backdrop-blur-xl hover:bg-slate-200 "
          : "hover:bg-zinc-100 "
      } [&>div:nth-child(2)]:hover:text-gray-800 [&>div:nth-child(2)]:active:bg-slate-300 active:bg-slate-200 cartnumber h-12 rounded-xl p-2 my-1 items-center duration-100 select-none justify-between`}
    >
      <div className="flex flex-row">
        <div className="h-6 w-6 bg-slate-60 rounded-md mr-3 mx-2 items-center text-md justify-center">
          {icon}
        </div>
        {title}
      </div>
      <div className="text-sm text-gray-600 rounded-md bg-zinc-100 p-0.5 mx-2 duration-150">
        {number}
      </div>
    </div>
  );
};

export default SideBarItem;
