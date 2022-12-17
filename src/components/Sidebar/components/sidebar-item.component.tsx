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
            <div className="absolute top-1 text-2xl">
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
              className="absolute top-0 left-0 h-10 w-12 opacity-40 rounded-xl"
            ></div>
          ))}
        <div
          ref={itemRef}
          onClick={() => setTab(item.id)}
          className={`w-full z-20 flex flex-row ${
            isSelected
              ? "bg-slate-400/20 dark:bg-zinc-700/30 [&>div:nth-child(2)]:bg-slate-300 [&>div:nth-child(2)]:dark:bg-zinc-700 [&>div:nth-child(2)]:text-gray-500 [&>div:nth-child(2)]:dark:text-gray-300 backdrop-blur-lg hover:bg-slate-100 dark:hover:bg-zinc-700"
              : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
          } [&>div:nth-child(2)]:hover:text-gray-400 [&>div:nth-child(2)]:dark:hover:text-gray-300 [&>div:nth-child(2)]:active:bg-slate-300 [&>div:nth-child(2)]:dark:active:bg-slate-800 cartnumber h-10 rounded-xl p-2 items-center duration-100 select-none justify-between`}
        >
          <div className="flex flex-row items-center">
            <div className="flex h-7 w-7 rounded-md mr-2 mx-1 items-center text-md justify-center">
              <ListIcon iconData={item.icon} variant="outline-thick" />
            </div>
            <div className="flex items-center w-full dark:text-slate-200 truncate text-sm font-['SFPro']">
              {item.title}
            </div>
          </div>

          <div className="text-xs flex w-5 h-5 font-semibold justify-center items-center text-gray-400 dark:text-gray-400 rounded-md bg-zinc-200 dark:bg-zinc-700 p-1 mx-1 duration-150">
            {number}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SideBarItem;
