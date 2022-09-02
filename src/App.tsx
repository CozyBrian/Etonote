import React from "react";
import TasksView from "./components/Main/tasks.component";
import SideBar from "./components/Sidebar/sidebar.component";

function App() {
  return (
    <>
      <div className="h-32 w-3/5 border-[3.5rem] border-sky-500 rounded-full mx-2 fixed left-0 -top-16 -z-10"></div>
      <div className="h-screen w-full flex flex-row bg-slate-200/90 overflow-hidden backdrop-blur-xl z-30">
        <SideBar />
        <TasksView />
      </div>
    </>
  );
}

export default App;
