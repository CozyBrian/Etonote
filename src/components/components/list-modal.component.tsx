import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { action } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import EmojiSetPicker from "./emoji-picker";
import { IEmojiData } from "emoji-picker-react";
import { ListIconData } from "../../@types";
import ListIcon from "./listIcon";

interface PropsA {
  onClick?: () => void;
}

interface PropsB {
  onClick?: () => void;
  ItemId: string;
}

export const AddListModal = ({ onClick }: PropsA) => {
  const [iconData, setIconData] = useState<ListIconData>({
    type: "EMOJI",
    data: "",
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [title, setTitle] = useState("");
  const lists = useAppSelector((state) => state.lists).value;
  const dispatch = useAppDispatch();

  const addListBox = document.getElementById("addListBox");

  const createList = (e?: React.ChangeEvent<any>) => {
    e?.preventDefault();
    if (iconData.data === "" || title === "") return;
    onClick!();
    dispatch(action.lists.addList({ icon: iconData, title: title }));
  };

  const setEmoji = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiData: IEmojiData
  ) => {
    setIconData({ type: "EMOJI", data: emojiData.emoji });
    setShowEmojiPicker(false);
    addListBox?.focus();
  };

  const setColorSet = (Icon: ListIconData) => {
    setIconData({ type: "COLOR", data: Icon.data });
    setShowEmojiPicker(false);
    addListBox?.focus();
  };

  useEffect(() => {
    if (title !== "") {
      dispatch(action.app.setSelectedTab(lists[lists.length - 1].id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="h-screen w-screen flex justify-center items-center top-0 left-0 fixed bg-white/50 dark:bg-black/50 z-50 select-none"
    >
      <div className="w-[32rem]  flex flex-col bg-white/90 dark:bg-zinc-700/80 rounded-2xl backdrop-blur-sm p-8">
        <div className="flex flex-row font-['SFPro'] text-3xl dark:text-slate-50 justify-between items-center pb-8">
          Create a list
          <div
            onClick={onClick}
            className="p-1 w-8 h-8 hover:bg-slate-200/30 active:bg-slate-200/70 flex items-center justify-center duration-100 rounded-md"
          >
            <FontAwesomeIcon icon={faTimes} size="sm" />
          </div>
        </div>
        <form
          className="relative flex flex-row h-14 font-['Montserrat']"
          onSubmit={createList}
        >
          <div
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="flex items-center text-2xl justify-center w-16 mr-4 bg-slate-300 hover:bg-slate-400 dark:bg-zinc-800 dark:hover:bg-zinc-700/70 dark:active:bg-zinc-800 active:bg-slate-500 active:scale-105 text-center p-3 rounded-2xl duration-150"
          >
            <ListIcon iconData={iconData} variant="fill" />
          </div>
          <div className="absolute top-16 left-0">
            <AnimatePresence>
              {showEmojiPicker && (
                <EmojiSetPicker
                  onEmojiClick={setEmoji}
                  onColorSetClick={setColorSet}
                />
              )}
            </AnimatePresence>
          </div>
          <input
            className="border-none w-full outline-none text-white bg-slate-300 dark:text-gray-300 dark:bg-zinc-800 dark:focus:bg-zinc-600 focus:bg-gray-400 focus:placeholder:text-gray-300 focus:text-2xl p-4 rounded-2xl duration-150"
            placeholder="Name"
            id="addListBox"
            accept="text"
            autoComplete="off"
            value={title}
            onChange={(value) => setTitle(value.target.value)}
          ></input>
          <input type="submit" hidden />
        </form>
        <div className="flex flex-row justify-end pt-4">
          <div
            onClick={() => createList()}
            className="cursor-pointer px-4 hover:bg-sky-500 dark:text-white hover:text-white text-black p-2 rounded-lg duration-150 bg-slate-400/30 active:bg-slate-400 font-semibold"
          >
            Create
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const DelListModal = ({ onClick, ItemId }: PropsB) => {
  const todos = useAppSelector((state) => state.todos.value);
  const appState = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const deleteList = (id: string | undefined) => {
    dispatch(action.lists.deleteList(id));

    todos.forEach((todo) => {
      if (todo.listID === id) {
        dispatch(action.todos.deleteTodo(todo.id));
      }
    });
    if (appState.selectedTab === id) {
      dispatch(action.app.setSelectedTab(appState.homeId));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="h-screen w-screen flex justify-center items-center top-0 left-0 fixed bg-black/50 z-50 select-none"
    >
      <div className="w-[20rem] flex flex-col bg-white/90 dark:bg-zinc-700/80 dark:text-slate-50 rounded-2xl backdrop-blur-sm p-5">
        <div className="flex font-['SFPro'] flex-row text-2xl justify-between items-center pb-2">
          Are you Sure?
        </div>
        <div className="font-['Montserrat']">
          This will delete the List and all items contained in it.
        </div>

        <div className="flex flex-row justify-end pt-3 gap-3">
          <div
            onClick={onClick}
            className="cursor-pointer px-4 bg-slate-300 dark:bg-zinc-700 p-2 rounded-lg text-white duration-150 hover:bg-slate-400/30 dark:hover:bg-zinc-600 active:bg-slate-400 font-semibold"
          >
            Cancel
          </div>
          <div
            onClick={() => deleteList(ItemId)}
            className="cursor-pointer px-4 bg-red-600 p-2 rounded-lg text-white duration-150 hover:bg-red-500 active:bg-red-700 font-semibold"
          >
            Delete
          </div>
        </div>
      </div>
    </motion.div>
  );
};
