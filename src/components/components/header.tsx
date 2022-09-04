import React from "react";
import { today } from "../../utils/date";
import { useAppSelector } from "../../hooks";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import TextTransition, { presets } from "react-text-transition";

const Header = () => {
  const app = useAppSelector((state) => state.app);
  const todoLists = useAppSelector((state) => state.lists.value);

  const selectedList = todoLists.find((item) => item.id === app.selectedTab);

  const todayDate = today;
  return (
    <div className="pb-8 select-none">
      <div className="flex flex-row">
        <div className="text-xl font-medium">
          <TextTransition springConfig={presets.stiff}>
            {app.selectedTab === "IzeReY"
              ? "Good Morning, Brian"
              : selectedList?.title}
          </TextTransition>
        </div>

        <div className="fixed">
          <TextTransition springConfig={presets.stiff}>
            {app.selectedTab === "IzeReY" ? (
              <div className="h-6 w-6 border-2 border-sky-500 rounded-md mx-2 relative right-16 top-1"></div>
            ) : (
              <div className="h-6 w-6 flex items-center justify-center text-3xl mx-2 relative right-16 top-0">
                {selectedList?.icon}
              </div>
            )}
          </TextTransition>
        </div>
      </div>
      <AnimatePresence>
        {app.selectedTab === "IzeReY" && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
