import React from "react";
import SideBarItem from "../components/sidebar-item.component";

const SideBar = () => {
  return (
    <div className="bg-white max-w-1/5 min-w-[350px] flex rounded-2xl m-2 flex-col p-8 pt-12">
      <SideBarItem />
      <SideBarItem />
      <SideBarItem />
    </div>
  );
};

export default SideBar;
