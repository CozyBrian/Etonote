import React from "react";
import Header from "../components/header";
import TaskList from "./task-list.component";

const TasksView = () => {
  return (
    <div className="flex container justify-center p-12 pb-0">
      <div className="min-w-[48rem]">
        <Header />
        <input
          className="border-none w-full outline-none text-white bg-slate-300 focus:bg-gray-400 focus:placeholder:text-gray-300 p-4 rounded-2xl duration-150"
          placeholder="Write a new task"
          accept="text"
        />
        <TaskList />
      </div>
    </div>
  );
};

export default TasksView;
