import { useState, useRef, useEffect } from "react";
import { action } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ListIcon from "./listIcon";

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
    const todoTitleDate = todoTitle.split("//");
    e.preventDefault();
    setShowIconFlag(false);
    setShowIconMenu(false);
    if (todoTitle !== "") {
      dispatch(
        action.todos.addTodo({
          listID: todoListId,
          title: todoTitleDate[0].trim(),
          icon: todoIcon,
          isDone: false,
          note: todoTitleDate[1] ? todoTitleDate[1].trim() : "",
        })
      );
    }
    setTodoTitle("");

    setTimeout(() => {
      domTextBox?.blur();
    }, 0.1);
  };

  const onTextBoxFocus = () => {
    if (todoTitle.length > 0) {
      setShowIconFlag(true);
    }
  };
  const onTextBoxBlur = () => {
    if (showIconMenu === false) {
      setShowIconFlag(false);
    }

    if (todoTitle.length > 0) {
      setShowIconFlag(true);
      domTextBox?.focus();
    }

    if (todoTitle === "") {
      return;
    }
  };

  useEffect(() => {
    setTodoIcon(todoLists.filter((todo) => todo.id === selectedList)[0].icon);
    setTodoListId(todoLists.filter((todo) => todo.id === selectedList)[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedList]);

  const domTextBox = document.getElementById("addTodoInput");

  useEffect(() => {
    domTextBox?.addEventListener("blur", onTextBoxBlur);
    domTextBox?.addEventListener("focus", onTextBoxFocus);

    return () => {
      domTextBox?.removeEventListener("blur", onTextBoxBlur);
      domTextBox?.removeEventListener("focus", onTextBoxFocus);
    };
    // eslint-disable-next-line
  }, [todoTitle, showIconMenu]);

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
              className="w-18 h-8 flex flex-row justify-between duration-75 items-center pl-2 px-2 dark:text-white bg-gray-300/50 dark:bg-zinc-800/50 active:bg-slate-200 dark:active:bg-zinc-700 hover:bg-slate-300 dark:hover:bg-zinc-800 rounded-lg absolute right-3 top-3 z-20"
            >
              <div className="flex justify-center items-center text-xs pr-1">
                <ListIcon iconData={todoIcon} variant="outline-thick" />
              </div>
              <div className="text-sm max-w-[6rem] truncate pr-2 font-['Montserrat']">
                {todoLists.find((item) => item.id === todoListId)?.title}
              </div>
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
            className="grid grid-cols-2 p-1 duration-75 select-none bg-slate-300 dark:bg-zinc-800 right-2 top-16 rounded-lg absolute z-20"
          >
            {todoLists.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setTodoIcon(item.icon);
                  setTodoListId(item.id);
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

      <input
        className="relative z-10 pr-32 border-none w-full outline-none text-gray-600 dark:text-gray-300 focus:shadow-2xl bg-slate-300 dark:bg-zinc-800 dark:focus:bg-zinc-600 focus:bg-white dark:focus:placeholder:text-zinc-800 focus:placeholder:text-gray-300 p-4 rounded-2xl font-['Montserrat'] duration-300"
        placeholder="Write a new task"
        ref={textBox}
        id="addTodoInput"
        accept="text"
        autoComplete="off"
        value={todoTitle}
        onChange={(value) => setTodoTitle(value.target.value)}
      ></input>
    </form>
  );
};

export default AddTodoInput;
