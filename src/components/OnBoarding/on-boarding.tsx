import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const [page, setPage] = useState(0);

  const items = [
    "bg-sky-500",
    "bg-slate-500",
    "bg-purple-500",
    "bg-orange-500",
  ];

  const navigate = useNavigate();

  const nextButton = () => {
    if (page < items.length - 1) {
      setPage(page + 1);
    } else {
      navigate("/home");
    }
  };

  return (
    <motion.div
      exit={{ opacity: 1 }}
      className="w-screen h-screen flex justify-center items-center bg-slate-300"
    >
      <motion.div
        exit={{ opacity: 0 }}
        className="flex flex-col w-[500px] h-[600px] items-center bg-white shadow-xl rounded-2xl  font-['VarelaRound'] duration-100"
      >
        <div className="flex justify-center overflow-x-scroll items-center h-full w-full bg-sky-300 rounded-t-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" flex items-center justify-center w-[450px]"
            >
              <div
                className={`w-48 h-48 rounded-full ${items[page]} shadow-xl`}
              ></div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="w-full h-[200px] p-4">
          <div className="flex">
            Nulla quis reprehenderit labore pariatur ut irure eiusmod Lorem
            deserunt quis. Elit esse officia amet eiusmod voluptate elit
            laboris. Enim id quis minim fugiat culpa elit id. Ullamco velit
            labore adipisicing occaecat nulla reprehenderit.
          </div>
          <div className="flex flex-row h-auto items-center mt-4 justify-end">
            <button
              onClick={nextButton}
              className="bg-sky-500 active:bg-sky-600 text-white px-6 py-2 rounded-lg duration-100"
            >
              {page === items.length - 1 ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OnBoarding;
