import { LayoutGroup, motion } from "framer-motion";
import AddTodoInput from "../components/add-todo-bar.component";
import Header from "../components/header";
import TaskList from "./task-list.component";

const TasksView = () => {
  return (
    <div className="flex container justify-center p-12 pb-0">
      <div className="min-w-[48rem]">
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
    </div>
  );
};

export default TasksView;
