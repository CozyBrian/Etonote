import React, { useEffect } from "react";
import TasksView from "./components/Main/tasks.component";
import SideBar from "./components/Sidebar/sidebar.component";
import { motion } from "framer-motion";
import BackIcon from "./components/components/backgroundIcon";
import { useAppDispatch, useAppSelector } from "./hooks";
import { action } from "./redux";
import { getUserState } from "./services/database";

function App() {
  const User = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (User.user_id !== null) {
      getUserState(User.user_id).then((data) => {
        dispatch(action.system.setState(data.system));
        dispatch(action.todos.setState(data.todos));
        dispatch(action.lists.setState(data.lists));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User.user_id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="duration-100"
    >
      <BackIcon />
      <div className="relative h-screen w-screen flex flex-row bg-slate-200/90 dark:bg-zinc-900/95 overflow-hidden backdrop-blur-2xl z-30">
        <SideBar />
        <TasksView />
      </div>
    </motion.div>
  );
}

export default App;
