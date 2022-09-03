import React from "react";
import SideBarItem from "../components/sidebar-item.component";
import { action } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";

const SideBar = () => {
  const rList = useAppSelector((state) => state.lists.value);
  const dispatch = useAppDispatch();

  const something = (num: number) => {
    return dispatch(action.lists.addNumber(num));
  };

  return (
    <div className="bg-white max-w-1/5 min-w-[350px] flex rounded-2xl m-2 flex-col p-8 pt-12">
      {rList.map((item, i) => (
        <div key={i} onClick={() => something(i)}>
          <SideBarItem
            title={item.title}
            icon={item.icon}
            number={item.number}
          />
        </div>
      ))}
    </div>
  );
};

export default SideBar;
