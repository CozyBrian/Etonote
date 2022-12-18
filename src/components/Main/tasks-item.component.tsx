import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { taskItem } from "../../@types";
import useRightClickMenu from "../../hooks/useRightClickMenu";
import { TodoContextMenu } from "../components/contextMenu";
import { TodoContextMenu as ContextMenu } from "../components/menus";
import ListIcon from "../components/listIcon";
import { useAppDispatch } from "../../hooks";
import { action } from "../../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import useMouseOverCallback from "../../hooks/useMouseOverCallback";

interface Props {
  item: taskItem;
}
const TaskItem = ({ item }: Props) => {
  const TaskRef = useRef(null);
  const itemRef = useRef(null);
  const menuRef = useRef(null);
  const WrapperRef = useRef(null);
  const { x, y, showMenu } = useRightClickMenu(TaskRef);
  const [isTaskHover, setIsTaskHover] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isDone, setisDone] = useState(item.isDone);

  const dispatch = useAppDispatch();

  const variants = {
    done: {
      height: 20,
      width: 20,
      borderRadius: "0.375rem",
    },
    notDone: { height: 0, width: 0, borderRadius: "1rem" },
  };

  const toggleDone = (id: string | undefined) => {
    setisDone(!isDone);
    setTimeout(() => {
      dispatch(action.todos.toggleDone(id));
    }, 300);
  };

  // TODO: Implement primary click to edit task
  const handleEdit = (id: string) => {
    dispatch(action.app.setTaskDetailsData(id));
    dispatch(action.app.setShowTaskDetails(true));
  };

  useMouseOverCallback(menuRef, () => {
    setIsShowMenu(false);
  });

  return (
    <motion.div
      layout
      ref={TaskRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsTaskHover(true)}
      onHoverEnd={() => setIsTaskHover(false)}
      className="relative [&>div:nth-child(2)>div:nth-child(2)]:hover:flex"
    >
      <div
        ref={WrapperRef}
        onClick={() => handleEdit(item.id!)}
        className="absolute w-[85.5%] h-full top-0 right-12 cursor-pointer"
      />
      {showMenu && <TodoContextMenu id={item.id} x={x} y={y} />}
      <motion.div
        ref={itemRef}
        className="w-full flex flex-row bg-white dark:bg-zinc-800 h-12 rounded-xl p-2 items-center justify-between select-none"
      >
        <div className="flex flex-row items-center">
          <motion.div
            onClick={() => toggleDone(item.id)}
            className="h-5 min-w-[1.25rem] flex justify-center items-center bg-zinc-200 dark:bg-zinc-700 rounded-md mx-2"
          >
            <motion.div
              className="bg-slate-600 dark:bg-slate-500"
              animate={isDone ? "done" : "notDone"}
              variants={variants}
            ></motion.div>
          </motion.div>
          <div className="w-full">
            <motion.p
              className={`font-['Montserrat'] text-sm truncate dark:text-slate-100 ${
                isDone && "strike"
              } duration-150`}
            >
              {item.title}
            </motion.p>
          </div>
        </div>
        <div
          ref={menuRef}
          className="flex absolute h-full w-12 p-2 top-0 right-0 duration-150"
        >
          <AnimatePresence>
            {isTaskHover && (
              <motion.button
                onClick={() => setIsShowMenu(!isShowMenu)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="flex justify-center items-center dark:hover:bg-zinc-700 hover:bg-zinc-200 dark:active:bg-zinc-600 active:bg-zinc-300 dark:bg-zinc-800 bg-zinc-100 dark:text-white rounded-lg h-full w-full text-lg duration-100"
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <div>
          <AnimatePresence>
            {isShowMenu && (
              <ContextMenu
                id={item.id}
                onClick={() => {
                  setIsTaskHover(false);
                  setIsShowMenu(false);
                }}
              />
            )}
          </AnimatePresence>
        </div>
        <motion.div
          layout="preserve-aspect"
          className="text-lg rounded-md mx-1"
        >
          <ListIcon iconData={item.icon} variant="outline-thick" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TaskItem;
