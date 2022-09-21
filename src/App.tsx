import React, { useEffect } from "react";
import TasksView from "./components/Main/tasks.component";
import SideBar from "./components/Sidebar/sidebar.component";
import TextTransition, { presets } from "react-text-transition";
import { useAppSelector, useAppDispatch } from "./hooks";
import LoadingScreen from "./components/components/loadingScreen";
import { action } from "./redux";
import { AnimatePresence } from "framer-motion";
import TitleBar from "./components/components/title-bar";
import "./App.css";

function App() {
  const app = useAppSelector((state) => state.app);
  const todoLists = useAppSelector((state) => state.lists.value);
  const dispatch = useAppDispatch();

  const selectedList = todoLists.find((item) => item.id === app.selectedTab);

  useEffect(() => {
    setTimeout(() => {
      dispatch(action.app.setSplashFalse());
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {app.selectedTab === app.homeId ? (
        <div className="h-32 w-3/5 border-[3.5rem] border-sky-500 rounded-full mx-2 fixed left-0 -top-16 -z-10"></div>
      ) : (
        <div className="h-32 w-3/5 flex items-center justify-center text-[40vw] fixed left-0 -top-16 -z-10">
          <TextTransition springConfig={presets.stiff}>
            {selectedList?.icon}
          </TextTransition>
        </div>
      )}
      <div className="flex flex-col h-screen w-full">
        <TitleBar />
        <div className="h-full w-full flex flex-row bg-slate-200/90 overflow-hidden backdrop-blur-2xl z-30">
          <AnimatePresence>{app.isSplash && <LoadingScreen />}</AnimatePresence>
          <SideBar />
          <TasksView />
        </div>
      </div>
    </>
  );
}

export default App;
