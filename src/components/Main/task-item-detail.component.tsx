import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ListIcon from "../components/listIcon";
import { AnimatePresence, motion } from "framer-motion";
import useMouseOverCallback from "../../hooks/useMouseOverCallback";
import { action } from "../../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import ReactTextareaAutosize from "react-textarea-autosize";

const TaskItemDetail = () => {
  const [click, setClick] = useState(1);
  const [showIconMenu, setShowIconMenu] = useState(false);
  const App = useAppSelector((state) => state.app);
  const todos = useAppSelector((state) => state.todos.value);
  const todoLists = useAppSelector((state) => state.lists.value);
  const dispatch = useAppDispatch();

  const item = todos.find((todo) => todo.id === App.taskDetailsData)!;
  const [itemNote, setItemNote] = useState(item.note);
  const [itemTitle, setItemTitle] = useState(item.title);
  const [itemIcon, setItemIcon] = useState(item.icon);
  const [itemListID, setItemListID] = useState(item.listID);

  const itemTitleValidate = itemTitle === "";

  const CardRef = useRef(null);
  const IconMenuPopUp = useRef(null);

  const variants = {
    done: {
      height: 20,
      width: 20,
      borderRadius: "0.375rem",
    },
    notDone: { height: 0, width: 0, borderRadius: "1rem" },
  };

  useMouseOverCallback(CardRef, () => {
    setClick(click + 1);
    if (click > 1) {
      dispatch(action.app.setShowTaskDetails(false));
    }
  });

  const toggleDone = (id: string | undefined) => {
    return dispatch(action.todos.toggleDone(id));
  };

  const handleSave = () => {
    if (itemTitle === "") {
      return;
    }

    dispatch(
      action.todos.editTodo({
        ...item,
        title: itemTitle,
        icon: itemIcon,
        listID: itemListID,
        note: itemNote ? itemNote : "",
      })
    );
    dispatch(action.app.setShowTaskDetails(false));
  };

  return (
    <motion.div className="h-screen w-full p-2 flex justify-end items-center top-0 left-0 absolute z-50 select-none">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.2, easings: ["easeInOut"] }}
        layoutId={item.id}
        ref={CardRef}
        className="flex flex-col justify-between custom-shadow-lg bg-white/90 h-full dark:bg-zinc-800 backdrop-blur-sm rounded-2xl w-[22rem] p-6 border border-slate-200 dark:border-none"
      >
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <div
              onClick={() => dispatch(action.app.setShowTaskDetails(false))}
              className="p-1 w-8 h-8 hover:bg-slate-200/30 active:bg-slate-200/70 dark:text-white flex items-center justify-center duration-100 rounded-md"
            >
              <FontAwesomeIcon icon={faTimes} size="sm" />
            </div>
          </div>

          <div className="flex flex-row items-center">
            <motion.div
              layout="position"
              onClick={() => toggleDone(item.id)}
              className="h-5 min-w-[1.25rem] flex justify-center items-center bg-zinc-200 dark:bg-zinc-700 rounded-md mx-1 mr-2"
            >
              <motion.div
                className="bg-slate-600 dark:bg-slate-500"
                animate={item.isDone ? "done" : "notDone"}
                variants={variants}
              ></motion.div>
            </motion.div>
            <div className="w-full">
              <motion.input
                layout="position"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                className={`text-sm font-['Montserrat'] w-full truncate overflow-clip dark:text-slate-100 bg-transparent ${
                  itemTitleValidate && "border border-red-500"
                } rounded-xl focus:outline-none`}
              />
            </div>
          </div>
          <div>
            <motion.div className="relative flex flex-col w-full bg-slate-100/80 dark:bg-zinc-700/90 dark:bg h-[88px] rounded-xl p-2">
              <div className="flex relative flex-row justify-between items-center w-full h-1/2 ">
                <p className="pl-1 text-sm text-slate-500 dark:text-zinc-500">
                  List
                </p>
                <div>
                  <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 5, opacity: 0 }}
                    onClick={() => setShowIconMenu(!showIconMenu)}
                    className="h-8 flex flex-row justify-between duration-75 items-center pl-2 px-2 dark:text-white bg-white dark:bg-zinc-800/50 active:bg-slate-200 dark:active:bg-zinc-700 hover:bg-slate-300 dark:hover:bg-zinc-800 shadow-sm rounded-lg z-20"
                  >
                    <div className="flex justify-center items-center text-xs pr-1">
                      <ListIcon iconData={itemIcon} variant="outline-thick" />
                    </div>
                    <div className="text-sm truncate pr-2 font-['Montserrat']">
                      {todoLists.find((item) => item.id === itemListID)?.title}
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="text-xs"
                      size="xs"
                    />
                  </motion.div>
                  <AnimatePresence>
                    {showIconMenu && (
                      <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        ref={IconMenuPopUp}
                        className="grid grid-cols-2 p-1 duration-75 select-none bg-slate-300 dark:bg-zinc-800 right-1 top-12 rounded-lg absolute z-20"
                      >
                        {todoLists.map(
                          (item) =>
                            item.id !== "ldMI0P" && (
                              <div
                                key={item.id}
                                onClick={() => {
                                  setItemIcon(item.icon);
                                  setItemListID(item.id);
                                  setShowIconMenu(false);
                                }}
                                className="h-11 w-11 flex m-1 justify-center duration-75 bg-slate-200 dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-600 active:bg-slate-50 dark:active:bg-zinc-700 rounded-lg items-center"
                              >
                                <ListIcon
                                  iconData={item.icon}
                                  variant="outline-thick"
                                />
                              </div>
                            )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full h-1/2 ">
                <p className="pl-1 text-sm text-slate-500 dark:text-zinc-500">
                  Schedule
                </p>
              </div>
            </motion.div>
            <ReactTextareaAutosize
              value={itemNote}
              onChange={(e) => setItemNote(e.target.value)}
              placeholder="Add a note..."
              className={`w-full min-h-[112px] flex-wrap rounded-xl dark:bg-[#3C3C36] bg-[#FAF6E9] placeholder:text-[#babc97] mt-2 focus:border border-[#fef0bb] dark:border-[#51542f] focus:border-[#f1e4ad] dark:focus:border-[#71744d] p-4 text-md text-[#7a745d] dark:text-slate-100 focus:outline-none resize-none scrollbar-hide duration-150`}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div
            onClick={() => handleSave()}
            className="cursor-pointer px-6 hover:bg-sky-500 dark:text-white hover:text-white text-black p-2 rounded-lg duration-150 bg-slate-400/30 active:bg-slate-400 font-semibold"
          >
            Save
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskItemDetail;
