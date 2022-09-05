import React, { useEffect, useState } from "react";
import { action } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import TaskItem from "../components/tasks-item.component";
import { taskItem } from "../../@types";
import { AnimatePresence, motion } from "framer-motion";

const TaskList = () => {
  const app = useAppSelector((state) => state.app);
  const list = useAppSelector((state) => state.todos.value);
  const dispatch = useAppDispatch();

  const [todos, setTodos] = useState<taskItem[]>([]);

  const something = (id: string | undefined) => {
    return dispatch(action.todos.toggleDone(id));
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
    <div className="h-full mt-4 pb-32">
      <div className="h-full pb-32 scrollbar-hide overflow-scroll">
        <AnimatePresence>
          {todos.length > 0 ? (
            todos.map((item) => (
              <TaskItem
                key={`${item.id}`}
                item={item}
                onClick={() => something(item.id)}
              />
            ))
          ) : (
            <motion.div
              layout
              className="flex h-32 justify-center items-center text-gray-500 text-xl font-medium"
            >
              It's a little empty here🥴
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;
