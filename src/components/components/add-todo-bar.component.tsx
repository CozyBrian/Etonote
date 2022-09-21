import { useState, useRef, useEffect } from "react";
import { action } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const AddTodoInput = () => {
  const todoLists = useAppSelector((state) => state.lists.value);
  const selectedList = useAppSelector((state) => state.app.selectedTab);
  const textBox = useRef<HTMLInputElement>(document.createElement("input"));
  const iconBox = useRef(null);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoIcon, setTodoIcon] = useState(todoLists[0].icon);
  const [todoListId, setTodoListId] = useState(todoLists[0].id);
  const [showIconFlag, setShowIconFlag] = useState(false);
  const [showIconMenu, setShowIconMenu] = useState(false);

  const dispatch = useAppDispatch();

  const addTodoItem = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setShowIconFlag(false);
    setShowIconMenu(false);
    if (todoTitle !== "") {
      dispatch(
        action.todos.addTodo({
          listID: todoListId,
          title: todoTitle,
          icon: todoIcon,
          isDone: false,
        })
      );
    }
    setTodoTitle("");
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  useEffect(() => {
    setTodoIcon(todoLists.filter((todo) => todo.id === selectedList)[0].icon);
    setTodoListId(todoLists.filter((todo) => todo.id === selectedList)[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedList]);

  useEffect(() => {
    if (todoTitle.length > 0) {
      setShowIconFlag(true);
    } else {
      setShowIconFlag(false);
      setShowIconMenu(false);
    }
  }, [todoTitle]);

  return (
    <form className="relative duration-100" onSubmit={addTodoItem}>
      <AnimatePresence>
        {showIconFlag && (
          <div ref={iconBox}>
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              onClick={() => setShowIconMenu(!showIconMenu)}
              className="w-18 h-8 flex flex-row justify-between duration-75 items-center pl-2 px-2 bg-slate-300 active:bg-slate-200 hover:bg-slate-300/50 border border-slate-500 rounded-lg absolute right-2 top-3 z-20"
            >
              <div className="text-xs pr-1">{todoIcon}</div>
              <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showIconFlag && showIconMenu && (
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 5, opacity: 0 }}
            className="grid grid-cols-2 p-1 duration-75 select-none bg-slate-300 right-2 top-16 rounded-lg absolute z-20"
          >
            {todoLists.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setTodoIcon(item.icon);
                  setTodoListId(item.id);
                  setShowIconMenu(false);
                }}
                className="h-11 w-11 flex m-1 justify-center duration-75 bg-slate-200 hover:bg-slate-100 active:bg-slate-50 rounded-lg items-center"
              >
                {item.icon}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <input
        className="relative z-10 border-none w-full outline-none text-white bg-slate-300 focus:bg-gray-400 focus:placeholder:text-gray-300 p-4 rounded-2xl duration-150"
        placeholder="Write a new task"
        ref={textBox}
        accept="text"
        value={todoTitle}
        onChange={(value) => setTodoTitle(value.target.value)}
      ></input>
    </form>
  );
};

export default AddTodoInput;
