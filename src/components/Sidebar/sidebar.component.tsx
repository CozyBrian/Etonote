import React from "react";
import SideBarItem from "../components/sidebar-item.component";
import { useAppSelector } from "../../hooks";

const SideBar = () => {
  const todoLists = useAppSelector((state) => state.lists.value);

  return (
    <div className="bg-white max-w-1/5 min-w-[350px] flex rounded-2xl m-2 flex-col p-8 pt-12">
      {todoLists.map((item, i) => (
        <SideBarItem
          key={item.id}
          id={item.id}
          title={item.title}
          icon={item.icon}
          number={item.number}
        />
      ))}
    </div>
  );
};

export default SideBar;
