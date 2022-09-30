import React from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../hooks";
import { action } from "../../redux";
import { motion } from "framer-motion";
import SideTab from "./components/sidetab.component";
import MainSettings from "./components/main.screens.component";

const Settings = () => {
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(action.app.setShowSettingsPanel());
  };

  const tabs = [
    { id: "AA", title: "Personal" },
    { id: "AB", title: "Appearance" },
    { id: "AC", title: "Shortcuts" },
    { id: "AD", title: "Misc" },
  ];

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
        className="relative flex flex-col w-full h-full bg-white rounded-2xl p-12"
      >
        <div className="flex w-full flex-row mb-4 items-center justify-between">
          <div className="text-3xl font-semibold">Settings</div>
          <button
            onClick={close}
            className="p-1 hover:bg-slate-300 active:bg-slate-400 w-4 h-4 flex items-center justify-center duration-100 rounded-md"
          >
            <FontAwesomeIcon icon={faClose} size="lg" color="black" />
          </button>
        </div>
        <div className="h-full w-full flex flex-row ">
          <div className="min-w-[240px] mr-7">
            {tabs.map((tab) => (
              <SideTab key={tab.id} item={tab} />
            ))}
          </div>
          <MainSettings tabs={tabs} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
