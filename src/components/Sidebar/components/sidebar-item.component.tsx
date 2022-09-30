import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { action } from "../../../redux";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { SidebarItem } from "../../../@types";
import useRightClickMenu from "../../../hooks/useRightClickMenu";
import { ListContextMenu } from "../../components/contextMenu";
import { DelListModal } from "../../components/list-modal.component";
import ListIcon from "../../components/listIcon";

interface Props {
  item: SidebarItem;
  number: number;
}

const SideBarItem = ({ item, number }: Props) => {
  const [showDelModal, setDelAddModal] = useState(false);
  const appState = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const itemRef = useRef(null);
  const { x, y, showMenu } = useRightClickMenu(itemRef);

  const setTab = (tabName: string) => {
    return dispatch(action.app.setSelectedTab(tabName));
  };

  const isSelected = appState.selectedTab === item.id;

  return (
    <>
      {showMenu && (
        <ListContextMenu
          handleDelete={(bool) => setDelAddModal(bool)}
          id={item.id}
          x={x}
          y={y}
        />
      )}
      <AnimatePresence>
        {showDelModal && (
          <DelListModal
            ItemId={item.id}
            onClick={() => setDelAddModal(false)}
          />
        )}
      </AnimatePresence>
      <motion.div layout className="relative">
        {isSelected &&
          (item.icon.type !== "COLOR" ? (
            <div className="absolute top-3 text-3xl">
              <ListIcon iconData={item.icon} variant="fill" />
            </div>
          ) : (
            <div
              style={{
                backgroundImage:
                  item.icon.type === "COLOR"
                    ? `linear-gradient(to right, ${item.icon.data},rgba(255,0,0,0))`
                    : "",
              }}
              className="absolute top-1 left-0 h-12 w-12 opacity-40 rounded-xl"
            ></div>
          ))}
        <div
          ref={itemRef}
          onClick={() => setTab(item.id)}
          className={`w-full z-20 flex flex-row ${
            isSelected
              ? "bg-slate-400/20 dark:bg-zinc-700/30 [&>div:nth-child(2)]:bg-slate-300 [&>div:nth-child(2)]:dark:bg-zinc-700 backdrop-blur-lg hover:bg-slate-200 dark:hover:bg-zinc-700"
              : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
          } [&>div:nth-child(2)]:hover:text-gray-800 [&>div:nth-child(2)]:dark:hover:text-gray-400 [&>div:nth-child(2)]:active:bg-slate-300 [&>div:nth-child(2)]:dark:active:bg-slate-800 active:bg-slate-200 dark:active:bg-zinc-900 cartnumber h-12 rounded-xl p-2 my-1 items-center duration-100 select-none justify-between`}
        >
          <div className="flex flex-row">
            <div className="h-7 w-7 rounded-md mr-3 mx-2 items-center text-lg justify-center">
              <ListIcon iconData={item.icon} variant="outline-thick" />
            </div>
            <div className="flex items-center w-[180px] dark:text-slate-200 truncate font-['SFPro']">
              {item.title}
            </div>
          </div>
          <div className="text-sm flex w-4 h-4 justify-center items-center text-gray-600 dark:text-gray-400 rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5 mx-2 duration-150">
            {number}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SideBarItem;
