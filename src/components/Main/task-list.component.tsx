import React, { useEffect, useState } from "react";
import { action } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import TaskItem from "../components/tasks-item.component";
import { taskItem } from "../../@types";

const TaskList = () => {
  const app = useAppSelector((state) => state.app);
  const list = useAppSelector((state) => state.todos.value);
  const dispatch = useAppDispatch();

  const [todos, setTodos] = useState<taskItem[]>([]);

  const something = (num: number) => {
    return dispatch(action.todos.toggleDone(num));
  };

  useEffect(() => {
    if (app.selectedTab !== "IzeReY") {
      const filteredTodo = list.filter(
        (item) => item.listID === app.selectedTab
      );
      setTodos(filteredTodo);
    } else {
      setTodos(list);
    }
  }, [app.selectedTab, list]);

  return (
    <div className="h-full mt-4 pb-32 duration-100">
      <div className="h-full pb-32 overflow-scroll">
        {todos.map((item, i) => (
          <TaskItem
            key={`${item.id}`}
            item={item}
            onClick={() => something(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
