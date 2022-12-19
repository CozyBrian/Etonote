import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useAppSelector } from "../../hooks";
import AddTodoInput from "../components/add-todo-bar.component";
import Header from "../components/header";
import Settings from "../Settings/settings.component";
import TaskItemDetail from "./task-item-detail.component";
import TaskList from "./task-list.component";

const TasksView = () => {
  const App = useAppSelector((state) => state.app);
  return (
    <div className="relative flex container justify-center p-12 pb-0 select-none">
      <div className="w-[40rem]">
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
      <AnimatePresence>{App.showSettingsPanel && <Settings />}</AnimatePresence>
      <AnimatePresence>
        {App.showTaskDetails && <TaskItemDetail />}
      </AnimatePresence>
    </div>
  );
};

export default TasksView;
