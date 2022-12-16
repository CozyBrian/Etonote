import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ListIcon from "../components/listIcon";
import { AnimatePresence, motion } from "framer-motion";
import useMouseOverCallback from "../../hooks/useMouseOverCallback";
import { action } from "../../redux";

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

  const CardRef = useRef(null);
  const IconMenuPopUp = useRef(null);

  useMouseOverCallback(CardRef, () => {
    setClick(click + 1);
    if (click > 1) {
      dispatch(action.app.setShowTaskDetails(false));
    }
  });

  const handleSave = () => {
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
        className="bg-white/70 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl w-[40rem] p-8 border border-slate-200 dark:border-none"
      >
        <motion.div className="relative flex">
          <motion.div
            onClick={() => setShowIconMenu(!showIconMenu)}
            layoutId={`${item.id}-icon`}
            layout="preserve-aspect"
            className="text-5xl mb-4 p-1 cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-600 rounded-lg"
          >
            <ListIcon iconData={itemIcon} variant="outline-thick" />
          </motion.div>
          <AnimatePresence>
            {showIconMenu && (
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 5, opacity: 0 }}
                transition={{ duration: 0.15 }}
                ref={IconMenuPopUp}
                className="grid grid-cols-2 p-1 duration-75 select-none bg-slate-300 dark:bg-zinc-800 left-16 top-0 rounded-lg absolute z-20"
              >
                {todoLists.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setItemIcon(item.icon);
                      setItemListID(item.id);
                      setShowIconMenu(false);
                    }}
                    className="h-11 w-11 flex m-1 justify-center duration-75 bg-slate-200 dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-600 active:bg-slate-50 dark:active:bg-zinc-700 rounded-lg items-center"
                  >
                    <ListIcon iconData={item.icon} variant="outline-thick" />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <div className="flex flex-col gap-2">
          <motion.input
            layoutId={`${item.id}-title`}
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            className="text-3xl font-['Montserrat'] w-full truncate overflow-clip dark:text-slate-100 bg-transparent focus:outline-none"
          />
          <div className="w-full h-48 rounded-xl p-4 bg-yellow-300/20 mt-2 border border-yellow-300/30">
            <textarea
              value={itemNote}
              onChange={(e) => setItemNote(e.target.value)}
              className="w-full h-full bg-transparent text-lg dark:text-slate-100 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex mt-4 justify-end">
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
