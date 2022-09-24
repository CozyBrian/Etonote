import React from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../hooks";
import { action } from "../../redux";
import { motion } from "framer-motion";

const Settings = () => {
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(action.app.setShowSettingsPanel());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut" }}
      className="flex items-center justify-center p-2 pl-[366px] bg-slate-300/90 fixed top-0 left-0 w-screen h-screen z-40"
    >
      <motion.div
        initial={{ x: 2000 }}
        animate={{ x: 0 }}
        exit={{ x: 2000 }}
        transition={{ ease: "easeInOut" }}
        className="relative flex flex-row w-full h-full bg-white rounded-2xl p-12"
      >
        <div className="flex h-full w-64">
          <div className="text-3xl font-semibold">Settings</div>
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="fixed right-6 top-6 text-lg">
            <button
              onClick={close}
              className="p-1 hover:bg-slate-300 active:bg-slate-400 flex items-center justify-center duration-100 rounded-md"
            >
              <FontAwesomeIcon icon={faClose} size="xl" color="black" />
            </button>
          </div>
          Work in Progress
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
