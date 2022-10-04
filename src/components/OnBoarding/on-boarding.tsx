import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const OnBoarding = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const items = [1, 2, 3, 4];
  const imageIndex = page;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
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
        <div className="flex justify-center items-center h-full w-full bg-sky-300 rounded-t-2xl">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={imageIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.3,
              }}
              className="w-48 h-48 rounded-full bg-slate-500 shadow-xl"
            ></motion.div>
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
              onClick={() => paginate(1)}
              className="bg-sky-500 active:bg-sky-600 text-white px-6 py-2 rounded-lg duration-100"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OnBoarding;
