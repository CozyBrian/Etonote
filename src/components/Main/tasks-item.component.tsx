import { useRef } from "react";
import { motion } from "framer-motion";
import { taskItem } from "../../@types";
import useRightClickMenu from "../../hooks/useRightClickMenu";
import { TodoContextMenu } from "../components/contextMenu";
import ListIcon from "../components/listIcon";

interface Props {
  item: taskItem;
  onClick: any;
}
const TaskItem = ({ item, onClick }: Props) => {
  const itemRef = useRef(null);
  const { x, y, showMenu } = useRightClickMenu(itemRef);

  const variants = {
    done: {
      height: 20,
      width: 20,
      borderRadius: "0.375rem",
    },
    notDone: { height: 0, width: 0, borderRadius: "1rem" },
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {showMenu && <TodoContextMenu id={item.id} x={x} y={y - 32} />}
      <div
        ref={itemRef}
        className="w-full flex flex-row bg-white h-14 rounded-2xl p-2 items-center justify-between my-2 select-none"
      >
        <div className="flex flex-row items-center w-full">
          <div
            onClick={() => onClick()}
            className="h-5 w-5 flex justify-center items-center bg-zinc-200 rounded-md mx-2"
          >
            <motion.div
              className="bg-slate-600"
              animate={item.isDone ? "done" : "notDone"}
              variants={variants}
            ></motion.div>
          </div>
          <div className="w-[42rem]">
            <div className="font-['Montserrat'] w-[42rem] truncate">
              {item.title}
            </div>
          </div>
        </div>
        <div className="text-lg rounded-md mx-2">
          <ListIcon iconData={item.icon} variant="outline-thick" />
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
