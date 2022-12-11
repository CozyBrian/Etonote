import TasksView from "./components/Main/tasks.component";
import SideBar from "./components/Sidebar/sidebar.component";
import { motion } from "framer-motion";
import BackIcon from "./components/components/backgroundIcon";
// import { getDatabase, ref, onValue } from "firebase/database";
// import { useAppDispatch, useAppSelector } from "./hooks";
// import { action } from "./redux";
// import { useEffect } from "react";

function App() {
  // const User = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();

  // const db = getDatabase();
  // const userStateRef = ref(db, "users/" + User.user_id + "/state");

  // useEffect(() => {
  //   onValue(userStateRef, (snapshot) => {
  //     const data = snapshot.val();
  //     dispatch(action.system.setState(data.system));
  //     dispatch(action.lists.setState(data.lists));
  //     dispatch(action.todos.setState(data.todos));
  //   });
  // }, []);

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
