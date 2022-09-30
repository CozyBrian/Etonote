import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import React from "react";
import { useAppSelector } from "../../hooks";
import ListIcon from "./listIcon";

const BackIcon = () => {
  const app = useAppSelector((state) => state.app);
  const todoLists = useAppSelector((state) => state.lists.value);

  const selectedList = todoLists.find((item) => item.id === app.selectedTab);

  return (
    <LayoutGroup>
      <div className="fixed top-0 left-0 w-screen h-screen dark:bg-zinc-900 -z-50"></div>
      <AnimatePresence>
        {todoLists.map(
          (item) =>
            item.id === selectedList?.id &&
            (item.icon.type === "COLOR" ? (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  backgroundImage:
                    item.icon.type === "COLOR"
                      ? `linear-gradient(to bottom, ${item.icon.data},rgba(255,0,0,0))`
                      : "",
                }}
                className="w-full fixed h-48 top-0 left-0"
              ></motion.div>
            ) : (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-32 w-3/5 flex items-center justify-center text-[40vw] fixed left-0 -top-40 -z-10"
              >
                <ListIcon iconData={item.icon} variant="fill" />
              </motion.div>
            ))
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default BackIcon;
