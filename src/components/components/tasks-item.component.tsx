import React from "react";

const TaskItem = () => {
  return (
    <div className="w-full flex flex-row bg-white h-14 rounded-2xl p-2 shadow shadow-slate-300 items-center justify-between my-2 select-none">
      <div className="flex flex-row">
        <div className="h-6 w-6 bg-zinc-200 rounded-md mx-2"></div>
        Get some stuff
      </div>
      <div className="text-xl rounded-md mx-2">📚</div>
    </div>
  );
};

export default TaskItem;
