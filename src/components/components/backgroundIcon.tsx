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
      <AnimatePresence>
        {todoLists.map(
          (item) =>
            item.id === selectedList?.id && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-32 w-3/5 flex items-center justify-center text-[40vw] fixed left-0 -top-40 -z-10"
              >
                <ListIcon iconData={item.icon} variant="fill" />
              </motion.div>
            )
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default BackIcon;
