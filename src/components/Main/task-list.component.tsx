import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import TaskItem from "./tasks-item.component";
import { taskItem } from "../../@types";
import { AnimatePresence, motion, Reorder } from "framer-motion";
// import { action } from "../../redux";

const TaskList = () => {
  const app = useAppSelector((state) => state.app);
  const list = useAppSelector((state) => state.todos.value);
  // const dispatch = useAppDispatch();

  const [todos, setTodos] = useState<taskItem[]>([]);

  useEffect(() => {
    if (app.selectedTab !== "IzeReY" && app.selectedTab !== "ldMI0P") {
      const filteredTodo = list.filter(
        (item) => item.listID === app.selectedTab && !item.isDone
      );
      setTodos(filteredTodo);
    } else if (app.selectedTab === "ldMI0P") {
      const filteredTodo = list.filter((item) => item.isDone);
      setTodos(filteredTodo);
    } else {
      const filteredTodo = list.filter((item) => !item.isDone);
      setTodos(filteredTodo);
    }
  }, [app.selectedTab, list]);

  return (
    <div className="h-full mt-4 pb-32">
      <motion.div className="h-full pb-32 scrollbar-hide overflow-y-scroll">
        <AnimatePresence mode="wait">
          {todos.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              key={"non-empty-list"}
              className="flex flex-col gap-1"
            >
              <Reorder.Group
                values={todos}
                axis="y"
                onReorder={setTodos}
                className="flex flex-col gap-1"
              >
                <AnimatePresence>
                  {todos.map((item) => (
                    <Reorder.Item key={`${item.id}`} value={item}>
                      <TaskItem item={item} />
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </motion.div>
          ) : (
            <div
              key={"empty-list"}
              className="flex flex-col h-[70vh] justify-center items-center text-gray-500 text-xl font-medium"
            >
              <div>
                <img
                  className="w-48 h-48 grayscale-[80%] opacity-25 select-none"
                  src={require("../../assets/images/tasklist.png")}
                  alt="done"
                />
              </div>
              It's a little empty here 🥴
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TaskList;
