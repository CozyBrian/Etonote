import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ListIcon from "../components/listIcon";
import { motion } from "framer-motion";
import useMouseOverCallback from "../../hooks/useMouseOverCallback";
import { action } from "../../redux";

const TaskItemDetail = () => {
  const [click, setClick] = React.useState(1);
  const App = useAppSelector((state) => state.app);
  const todos = useAppSelector((state) => state.todos.value);
  const dispatch = useAppDispatch();

  const item = todos.find((todo) => todo.id === App.taskDetailsData)!;

  const CardRef = React.useRef(null);

  useMouseOverCallback(CardRef, () => {
    setClick(click + 1);
    if (click > 1) {
      dispatch(action.app.setShowTaskDetails(false));
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="h-screen w-full flex justify-center items-center top-0 left-0 absolute bg-white/30 dark:bg-black/30 z-50 select-none"
    >
      <motion.div
        layoutId={item.id}
        ref={CardRef}
        className="bg-white/70 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl w-[40rem] p-8"
      >
        <motion.div
          layoutId={`${item.id}-icon`}
          layout="preserve-aspect"
          className="text-5xl mb-4"
        >
          <ListIcon iconData={item.icon} variant="outline-thick" />
        </motion.div>
        <div className="flex flex-col gap-2">
          <motion.p
            layoutId={`${item.id}-title`}
            className="text-3xl font-['Montserrat'] w-[42rem] dark:text-slate-100"
          >
            {item.title}
          </motion.p>
          <div className="w-full h-48 rounded-2xl p-4 bg-yellow-300/20 mt-2 border border-yellow-300/30">
            <textarea
              value={item.note}
              readOnly
              className="w-full h-full bg-transparent text-lg dark:text-slate-100 focus:outline-none"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskItemDetail;
