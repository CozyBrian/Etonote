import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 w-screen h-screen bg-slate-300 opacity-0 z-50 flex justify-center items-center"
    >
      <div></div>
    </motion.div>
  );
};

export default LoadingScreen;
