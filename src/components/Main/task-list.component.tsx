import React from "react";
import { action } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import TaskItem from "../components/tasks-item.component";

const TaskList = () => {
  const todos = useAppSelector((state) => state.todos.value);
  const dispatch = useAppDispatch();

  const something = (num: number) => {
    return dispatch(action.todos.toggleDone(num));
  };

  return (
    <div className="h-full mt-4 pb-32">
      <div className="h-full pb-32 overflow-scroll">
        {todos.map((item, i) => (
          <TaskItem
            key={`${item.title}`}
            title={item.title}
            icon={item.icon}
            isDone={item.isDone}
            onClick={() => something(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
