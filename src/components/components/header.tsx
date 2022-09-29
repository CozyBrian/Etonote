import React from "react";
import { today } from "../../utils/date";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { action } from "../../redux";
import ListIcon from "./listIcon";

const Header = () => {
  const app = useAppSelector((state) => state.app);
  const todoLists = useAppSelector((state) => state.lists.value);
  const dispatch = useAppDispatch();

  const openSettings = () => {
    dispatch(action.app.setShowSettingsPanel());
  };

  const selectedList = todoLists.find((item) => item.id === app.selectedTab);

  const todayDate = today;
  return (
    <div className="pb-8 select-none">
      <div className="fixed right-6 top-6">
        <button
          onClick={openSettings}
          className="p-1 hover:bg-slate-300 active:bg-slate-400 flex items-center justify-center duration-100 rounded-md"
        >
          <FontAwesomeIcon icon={faGear} size="xl" color="black" />
        </button>
      </div>
      <div className="flex flex-row">
        <div className="text-xl font-medium">
          {app.selectedTab === app.homeId
            ? "Good Morning, Brian"
            : selectedList?.title}
        </div>

        <div className="fixed">
          <LayoutGroup>
            <AnimatePresence>
              {app.selectedTab === app.homeId && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-6 w-6 border-2 border-sky-500 rounded-md mx-2 relative right-16 top-1"
                ></motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {app.selectedTab !== app.homeId &&
                todoLists.map(
                  (item) =>
                    item.id === selectedList?.id && (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-6 w-6 flex items-center justify-center text-3xl mx-2 absolute right-32 -left-16 top-0"
                      >
                        <ListIcon iconData={item.icon} />
                      </motion.div>
                    )
                )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
      <AnimatePresence>
        {app.selectedTab === app.homeId && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-500 text-xl font-medium"
          >
            It's {todayDate}
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
