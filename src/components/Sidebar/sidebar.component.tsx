import React from "react";
import SideBarItem from "./components/sidebar-item.component";
import { useAppDispatch, useAppSelector } from "../../hooks";
import AddListButton from "./components/addLists-button";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { AddListModal } from "../components/list-modal.component";
import { action } from "../../redux";

const SideBar = () => {
  const app = useAppSelector((state) => state.app);
  const todoLists = useAppSelector((state) => state.lists.value);
  const list = useAppSelector((state) => state.todos.value);
  const dispatch = useAppDispatch();

  const filteredTodo = (id: string) => {
    if (id === app.homeId) {
      return list.length;
    } else {
      return list.filter((item) => item.listID === id).length;
    }
  };

  const setShowAddEditPanel = (value: boolean) => {
    dispatch(action.app.setAddEditPanelMode("ADD"));
    dispatch(action.app.setShowAddEditPanel(value));
  };

  return (
    <div className="bg-white dark:bg-zinc-800 max-w-1/5 min-w-[350px] flex rounded-2xl m-2 flex-col p-10 select-none">
      <AnimatePresence>
        {app.showAddEditPanel && (
          <AddListModal onClick={() => setShowAddEditPanel(false)} />
        )}
      </AnimatePresence>

      <LayoutGroup>
        <div className="flex flex-col gap-1">
          {todoLists.map((item, _) => (
            <SideBarItem
              key={item.id}
              item={item}
              number={filteredTodo(item.id)}
            />
          ))}
        </div>
        <AddListButton onClick={() => setShowAddEditPanel(true)} />
      </LayoutGroup>
    </div>
  );
};

export default SideBar;
