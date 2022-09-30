import React from "react";
import { action } from "../../../redux";
import { useAppDispatch, useAppSelector } from "../../../hooks";

type Props = {
  item: { id: string; title: string };
};

const SideTab = ({ item }: Props) => {
  const appState = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const isSelected = appState.selectedSettingsTab === item.id;

  const setTab = (tabId: string) => {
    return dispatch(action.app.setSelectedSettingsTab(tabId));
  };

  return (
    <div
      onClick={() => setTab(item.id)}
      className={`w-full z-20 flex flex-row ${
        isSelected
          ? "bg-slate-400/20 backdrop-blur-lg hover:bg-slate-200 dark:hover:bg-slate-500/50 "
          : "hover:bg-zinc-100 dark:hover:bg-zinc-700"
      }   active:bg-slate-200 dark:active:bg-slate-500 h-12 rounded-xl p-2 pl-3 my-1 items-center duration-100 select-none justify-between`}
    >
      <div className="flex items-center font-['SFPro']">{item.title}</div>
    </div>
  );
};

export default SideTab;
