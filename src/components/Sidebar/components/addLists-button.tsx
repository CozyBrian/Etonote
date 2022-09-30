import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface Props {
  onClick?: () => void;
}

const AddListButton = ({ onClick }: Props) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`w-full z-20 flex flex-row 
         hover:bg-zinc-100 dark:hover:bg-zinc-700 active:bg-slate-200 dark:active:bg-slate-700 cartnumber h-12 rounded-xl p-2 my-1 items-center duration-100 select-none justify-between`}
    >
      <div className="flex flex-row dark:text-white">
        <div className="h-6 w-6 rounded-md mx-3 items-center text-md justify-center">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        Create new list
      </div>
    </motion.div>
  );
};

export default AddListButton;
