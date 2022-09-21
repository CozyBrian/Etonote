import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { action } from "../../../redux";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { SidebarItem } from "../../../@types";
import useRightClickMenu from "../../../hooks/useRightClickMenu";
import { ListContextMenu } from "../../components/contextMenu";
import { DelListModal } from "../../components/list-modal.component";

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
        {isSelected && (
          <div className="absolute top-3 text-2xl">{item.icon}</div>
        )}
        <div
          ref={itemRef}
          onClick={() => setTab(item.id)}
          className={`w-full z-20 flex flex-row ${
            isSelected
              ? "bg-slate-400/20 [&>div:nth-child(2)]:bg-slate-300 backdrop-blur-md hover:bg-slate-200 "
              : "hover:bg-zinc-100 "
          } [&>div:nth-child(2)]:hover:text-gray-800 [&>div:nth-child(2)]:active:bg-slate-300 active:bg-slate-200 cartnumber h-12 rounded-xl p-2 my-1 items-center duration-100 select-none justify-between`}
        >
          <div className="flex flex-row">
            <div className="h-6 w-6 bg-slate-60 rounded-md mr-3 mx-2 items-center text-md justify-center">
              {item.icon}
            </div>
            {item.title}
          </div>
          <div className="text-sm text-gray-600 rounded-md bg-zinc-100 p-0.5 mx-2 duration-150">
            {number}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SideBarItem;
