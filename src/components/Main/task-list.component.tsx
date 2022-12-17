import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import TaskItem from "./tasks-item.component";
import { taskItem } from "../../@types";
import { AnimatePresence, motion } from "framer-motion";

const TaskList = () => {
  const app = useAppSelector((state) => state.app);
  const list = useAppSelector((state) => state.todos.value);

  const [todos, setTodos] = useState<taskItem[]>([]);

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
      <div className="h-full pb-32 scrollbar-hide overflow-y-scroll">
        <AnimatePresence>
          {todos.length > 0 ? (
            <motion.div className="flex flex-col gap-1">
              <AnimatePresence>
                {todos.map((item) => (
                  <TaskItem key={`${item.id}`} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>
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
