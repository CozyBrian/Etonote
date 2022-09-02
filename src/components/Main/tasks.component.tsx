import React from "react";
import TaskItem from "../components/tasks-item.component";

const TasksView = () => {
  return (
    <div className="flex container justify-center p-12 pb-0">
      <div className="min-w-[48rem]">
        <div className="pb-8 select-none">
          <div className="flex flex-row">
            <h1 className="text-xl font-medium">Good Morning, Brian</h1>
            <div className="fixed">
              <div className="h-6 w-6 border-2 border-sky-500 rounded-md mx-2 relative right-16 top-1"></div>
            </div>
          </div>
          <h1 className="text-gray-600 text-xl font-medium">
            It's Friday, Sept 2
          </h1>
        </div>
        <input
          className="border-none w-full outline-none bg-slate-300 focus:bg-gray-400 p-4 rounded-2xl duration-150"
          placeholder="Write a new task"
          accept="text"
        />
        <div className="h-full mt-4 pb-32">
          <div className="h-full pb-32 overflow-scroll ">
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksView;
