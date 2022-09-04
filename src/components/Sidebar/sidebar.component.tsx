import React from "react";
import SideBarItem from "../components/sidebar-item.component";
import { useAppSelector } from "../../hooks";

const SideBar = () => {
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
      {todoLists.map((item, i) => (
        <SideBarItem key={item.id} item={item} number={filteredTodo(item.id)} />
      ))}
    </div>
  );
};

export default SideBar;
