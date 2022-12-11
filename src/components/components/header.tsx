import React from "react";
import { timeOfDay, today } from "../../utils/date";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { action } from "../../redux";
import ListIcon from "./listIcon";

const Header = () => {
  const app = useAppSelector((state) => state.app);
  const user = useAppSelector((state) => state.user);
  const todoLists = useAppSelector((state) => state.lists.value);
  const dispatch = useAppDispatch();

  const openSettings = () => {
    dispatch(action.app.setShowSettingsPanel());
  };

  const selectedList = todoLists.find((item) => item.id === app.selectedTab);

  const todayDate = today;
  return (
    <div className="pb-8 select-none font-['SFPro']">
      <div className="fixed right-6 top-6">
        <button
          onClick={openSettings}
          className="p-1 hover:bg-slate-300 dark:hover:bg-slate-600 active:bg-slate-400 dark:active:bg-slate-700 dark:text-slate-100 flex items-center justify-center duration-100 rounded-md"
        >
          <FontAwesomeIcon icon={faGear} size="xl" />
        </button>
      </div>
      <div className="flex flex-row">
        <div className="text-xl font-medium dark:text-slate-100">
          {app.selectedTab === app.homeId ? (
            <div>
              Good {timeOfDay},{" "}
              <span className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-sky-400 hover:to-blue-600 duration-300">
                {user.userName?.split(" ")[0]}
              </span>
            </div>
          ) : (
            selectedList?.title
          )}
        </div>
        <div className="fixed">
          <LayoutGroup>
            <AnimatePresence>
              {todoLists.map(
                (item) =>
                  item.id === selectedList?.id && (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-6 w-6 flex items-center justify-center text-3xl mx-2 absolute right-32 -left-16 top-0"
                    >
                      <ListIcon iconData={item.icon} variant="outline" />
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
            className="text-gray-500 dark:text-gray-400 text-xl font-medium"
          >
            It's {todayDate}
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
