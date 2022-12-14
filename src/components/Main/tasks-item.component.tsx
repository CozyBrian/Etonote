import { useRef } from "react";
import { motion } from "framer-motion";
import { ListIconData, taskItem } from "../../@types";
import useRightClickMenu from "../../hooks/useRightClickMenu";
import { TodoContextMenu } from "../components/contextMenu";
import ListIcon from "../components/listIcon";
import { useAppSelector } from "../../hooks";

interface Props {
  item: taskItem;
  onClick: any;
}
const TaskItem = ({ item, onClick }: Props) => {
  const lists = useAppSelector((state) => state.lists.value);
  const itemRef = useRef(null);
  const { x, y, showMenu } = useRightClickMenu(itemRef);

  const ItemIcon = lists.find((list) => list.id === item.listID)?.icon;

  const DefaultIcon = ItemIcon
    ? ItemIcon
    : ({ type: "COLOR", data: "#e90e0e" } as ListIconData);

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
      {showMenu && <TodoContextMenu id={item.id} x={x} y={y} />}
      <motion.div
        layoutId={item.id}
        ref={itemRef}
        className="w-full flex flex-row bg-white dark:bg-zinc-800 h-14 rounded-2xl p-2 items-center justify-between my-2 select-none"
      >
        <div className="flex flex-row items-center w-full">
          <motion.div
            layoutId={`${item.id}-isDone`}
            onClick={() => onClick()}
            className="h-5 w-5 flex justify-center items-center bg-zinc-200 dark:bg-zinc-700 rounded-md mx-2"
          >
            <motion.div
              className="bg-slate-600 dark:bg-slate-500"
              animate={item.isDone ? "done" : "notDone"}
              variants={variants}
            ></motion.div>
          </motion.div>
          <div className="w-[42rem]">
            <motion.p
              layoutId={`${item.id}-title`}
              className="font-['Montserrat'] w-[42rem] truncate dark:text-slate-100"
            >
              {item.title}
            </motion.p>
          </div>
        </div>
        <motion.div
          layoutId={`${item.id}-icon`}
          layout="preserve-aspect"
          className="text-lg rounded-md mx-2"
        >
          <ListIcon iconData={DefaultIcon} variant="outline-thick" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TaskItem;
