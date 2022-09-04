import React, { useState } from "react";
import SideBarItem from "./components/sidebar-item.component";
import { useAppSelector } from "../../hooks";
import AddListButton from "./components/addLists-button";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import AddListModal from "../components/add-list-modal.component";

const SideBar = () => {
  const [showModal, setShowModal] = useState(false);
  const todoLists = useAppSelector((state) => state.lists.value);
  const list = useAppSelector((state) => state.todos.value);

  const filteredTodo = (id: string) => {
    if (id === "IzeReY") {
      return list.length;
    } else {
      return list.filter((item) => item.listID === id).length;
    }
  };

  return (
    <div className="bg-white max-w-1/5 min-w-[350px] flex rounded-2xl m-2 flex-col p-8 pt-12">
      <AnimatePresence>
        {showModal && <AddListModal onClick={() => setShowModal(false)} />}
      </AnimatePresence>
      <LayoutGroup>
        {todoLists.map((item, i) => (
          <SideBarItem
            key={item.id}
            item={item}
            number={filteredTodo(item.id)}
          />
        ))}
        <AddListButton onClick={() => setShowModal(true)} />
      </LayoutGroup>
    </div>
  );
};

export default SideBar;
