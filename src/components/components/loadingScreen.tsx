import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";

import image from "../../assets/images/splash.png";

const LoadingScreen = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      console.log(user);

      if (user.user_id !== null) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 w-screen h-screen bg-slate-300 dark:bg-zinc-900 opacity-0 z-50 flex justify-center items-center"
    >
      <div className="flex justify-center flex-col">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-48"
          src={image}
          alt="logo"
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
