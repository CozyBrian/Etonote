import React, { useState } from "react";
import SideBarItem from "./components/sidebar-item.component";
import { useAppSelector } from "../../hooks";
import AddListButton from "./components/addLists-button";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { AddListModal } from "../components/list-modal.component";

const SideBar = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const app = useAppSelector((state) => state.app);
  const todoLists = useAppSelector((state) => state.lists.value);
  const list = useAppSelector((state) => state.todos.value);

  const filteredTodo = (id: string) => {
    if (id === app.homeId) {
      return list.length;
    } else {
      return list.filter((item) => item.listID === id).length;
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 max-w-1/5 min-w-[350px] flex rounded-2xl m-2 flex-col p-8 pt-12 select-none">
      <AnimatePresence>
        {showAddModal && (
          <AddListModal onClick={() => setShowAddModal(false)} />
        )}
      </AnimatePresence>
      <LayoutGroup>
        {todoLists.map((item, i) => (
          <SideBarItem
            key={item.id}
            item={item}
            number={filteredTodo(item.id)}
          />
        ))}
        <AddListButton onClick={() => setShowAddModal(true)} />
      </LayoutGroup>
    </div>
  );
};

export default SideBar;
