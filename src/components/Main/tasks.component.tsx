import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useAppSelector } from "../../hooks";
import AddTodoInput from "../components/add-todo-bar.component";
import Header from "../components/header";
import Settings from "../Settings/settings.component";
import TaskList from "./task-list.component";

const TasksView = () => {
  const showSettings = useAppSelector((state) => state.app.showSettingsPanel);
  return (
    <div className="flex container justify-center p-12 pb-0 select-none">
      <div className="w-[48rem]">
        <LayoutGroup>
          <Header />
          <motion.div layout>
            <AddTodoInput />
          </motion.div>
          <motion.div layout className="h-full">
            <TaskList />
          </motion.div>
        </LayoutGroup>
      </div>
      <AnimatePresence>{showSettings && <Settings />}</AnimatePresence>
    </div>
  );
};

export default TasksView;
