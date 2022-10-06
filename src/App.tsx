import React from "react";
import TasksView from "./components/Main/tasks.component";
import SideBar from "./components/Sidebar/sidebar.component";
import { useAppSelector } from "./hooks";
import { motion } from "framer-motion";
import BackIcon from "./components/components/backgroundIcon";

function App() {
  // const app = useAppSelector((state) => state.app);
  const global = useAppSelector((state) => state.system);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(action.app.setSplashFalse());
  //   }, 2000);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={global.THEME === "Dark" ? "dark duration-100" : "duration-100"}
    >
      <BackIcon />
      <div className="relative h-screen w-screen flex flex-row bg-slate-200/90 dark:bg-zinc-900/95 overflow-hidden backdrop-blur-2xl z-30">
        {/* <AnimatePresence>{app.isSplash && <LoadingScreen />}</AnimatePresence> */}
        <SideBar />
        <TasksView />
      </div>
    </motion.div>
  );
}

export default App;
