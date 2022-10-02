import React from "react";
import { motion } from "framer-motion";
// import image from "../../assets/images/splash.png";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 w-screen h-screen bg-slate-300 dark:bg-zinc-900 opacity-0 z-50 flex justify-center items-center"
    >
      <div className="flex justify-center flex-col">
        <img
          className="h-48"
          src={require("../../assets/images/splash.png")}
          alt="logo"
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
