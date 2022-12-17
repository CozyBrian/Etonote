import TasksView from "./components/Main/tasks.component";
import SideBar from "./components/Sidebar/sidebar.component";
import { motion } from "framer-motion";
import BackIcon from "./components/components/backgroundIcon";
import store from "./redux";
import { useEffect } from "react";
import { setUserState } from "./services/database";

function App() {
  useEffect(() => {
    const storeCloud = store.subscribe(() => {
      const state = store.getState();

      if (state.user.user_id) {
        setUserState(state.user.user_id, {
          system: state.system,
          lists: state.lists,
          todos: state.todos,
        });
      }
    });

    return () => {
      storeCloud();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="duration-100"
    >
      <BackIcon />
      <div className="relative h-screen w-screen flex flex-row bg-gray-100/90 dark:bg-zinc-900/95 overflow-hidden backdrop-blur-2xl z-30">
        <SideBar />
        <TasksView />
      </div>
    </motion.div>
  );
}

export default App;
