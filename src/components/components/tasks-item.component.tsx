import React from "react";
import { taskItem } from "../../@types";

const TaskItem = ({ title, isDone, icon }: taskItem) => {
  return (
    <div className="w-full flex flex-row bg-white h-14 rounded-2xl p-2 shadow shadow-slate-300 items-center justify-between my-2 select-none">
      <div className="flex flex-row items-center">
        <div
          className={`h-5 w-5 ${
            isDone ? "bg-slate-600" : "bg-zinc-200"
          } rounded-md mx-2`}
        ></div>
        {title}
      </div>
      <div className="text-lg rounded-md mx-2">{icon}</div>
    </div>
  );
};

export default TaskItem;
