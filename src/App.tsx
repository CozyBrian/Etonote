import React, { useEffect } from "react";
import TasksView from "./components/Main/tasks.component";
import SideBar from "./components/Sidebar/sidebar.component";
import { useAppSelector, useAppDispatch } from "./hooks";
import LoadingScreen from "./components/components/loadingScreen";
import { action } from "./redux";
import { AnimatePresence } from "framer-motion";
import BackIcon from "./components/components/backgroundIcon";
import TitleBar from "./components/components/title-bar";
import "./App.css";

function App() {
  const app = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(action.app.setSplashFalse());
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackIcon />
      <div className="flex flex-col h-screen w-screen">
        <TitleBar />
        <div className="relative h-full w-screen flex flex-row bg-slate-200/90 overflow-hidden backdrop-blur-2xl z-30">
          <AnimatePresence>{app.isSplash && <LoadingScreen />}</AnimatePresence>
          <SideBar />
          <TasksView />
        </div>
      </div>
    </>
  );
}

export default App;
