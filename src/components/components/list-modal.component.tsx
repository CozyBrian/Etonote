import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";

import { action } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface PropsA {
  onClick?: () => void;
}

interface PropsB {
  onClick?: () => void;
  ItemId: string;
}

export const AddListModal = ({ onClick }: PropsA) => {
  const [icon, setIcon] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [title, setTitle] = useState("");
  const lists = useAppSelector((state) => state.lists).value;
  const dispatch = useAppDispatch();

  const createList = (e?: React.ChangeEvent<any>) => {
    e?.preventDefault();
    if (icon === "" || title === "") return;
    onClick!();
    dispatch(action.lists.addList({ icon: icon, title: title }));
  };

  const setEmoji = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiData: IEmojiData
  ) => {
    setIcon(emojiData.emoji);
    setShowEmojiPicker(false);
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
      className="h-screen w-screen flex justify-center items-center top-0 left-0 fixed bg-black/50 z-50 select-none"
    >
      <div className="w-[32rem]  flex flex-col bg-slate-200/90 rounded-2xl backdrop-blur-sm p-8">
        <div className="flex flex-row text-4xl justify-between items-center text-white pb-8">
          Create a list
          <div
            onClick={onClick}
            className="p-1 w-8 h-8 hover:bg-slate-200/30 active:bg-slate-200/70 flex items-center justify-center duration-100 rounded-md"
          >
            <FontAwesomeIcon icon={faTimes} size="sm" />
          </div>
        </div>
        <form className="relative flex flex-row h-14" onSubmit={createList}>
          <div
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="flex items-center text-2xl justify-center w-16 mr-4 bg-slate-300 hover:bg-slate-400 active:bg-slate-500 active:scale-105 text-center p-3 rounded-2xl duration-150"
          >
            {icon}
          </div>
          <div className="absolute top-16 left-0">
            {showEmojiPicker && (
              <div className="h-24 w-18 bg-slate-100 rounded-2xl">
                <EmojiPicker
                  onEmojiClick={setEmoji}
                  disableSkinTonePicker={true}
                  pickerStyle={{
                    backgroundColor: "rgb(241, 245, 249)",
                    boxShadow: "none",
                    borderRadius: "1rem",
                    paddingTop: "1rem",
                    width: "18rem",
                  }}
                />
              </div>
            )}
          </div>
          <input
            className="border-none w-full outline-none text-white bg-slate-300 focus:bg-gray-400 focus:placeholder:text-gray-300 focus:text-2xl p-4 rounded-2xl duration-150"
            placeholder="Name"
            accept="text"
            value={title}
            onChange={(value) => setTitle(value.target.value)}
          ></input>
          <input type="submit" hidden />
        </form>
        <div className="flex flex-row justify-end pt-4">
          <div
            onClick={() => createList()}
            className="cursor-pointer px-4 bg-slate-300 p-2 rounded-lg text-white duration-150 hover:bg-slate-400/30 active:bg-slate-400 font-semibold"
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
      <div className="w-[20rem] flex flex-col bg-slate-200/90 rounded-2xl backdrop-blur-sm p-5">
        <div className="flex flex-row text-2xl justify-between items-center text-white pb-4">
          Are you Sure?
        </div>
        <div>This will delete the List and all items contained in it.</div>

        <div className="flex flex-row justify-end pt-3 gap-3">
          <div
            onClick={onClick}
            className="cursor-pointer px-4 bg-slate-300 p-2 rounded-lg text-white duration-150 hover:bg-slate-400/30 active:bg-slate-400 font-semibold"
          >
            Cancel
          </div>
          <div
            onClick={() => deleteList(ItemId)}
            className="cursor-pointer px-4 bg-red-500 p-2 rounded-lg text-white duration-150 hover:bg-red-600 active:bg-red-700 font-semibold"
          >
            Delete
          </div>
        </div>
      </div>
    </motion.div>
  );
};
