import React from "react";
import SideBarItem from "../components/sidebar-item.component";

const SideBar = () => {
  const lists = [
    {
      title: "Gaming",
      icon: "🎮",
      number: 4,
    },
    {
      title: "School",
      icon: "📚",
      number: 13,
    },
    {
      title: "React Todo",
      icon: "👨🏾‍💻",
      number: 6,
    },
  ];

  return (
    <div className="bg-white max-w-1/5 min-w-[350px] flex rounded-2xl m-2 flex-col p-8 pt-12">
      {lists.map((item, i) => (
        <SideBarItem
          key={i}
          title={item.title}
          icon={item.icon}
          number={item.number}
        />
      ))}
    </div>
  );
};

export default SideBar;
