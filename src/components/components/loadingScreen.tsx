import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Oval } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { getUserState } from "../../services/database";
import { action } from "../../redux";

// import image from "../../assets/images/splash.png";

const LoadingScreen = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (user.user_id !== null) {
        getUserState(user.user_id).then((res) => {
          dispatch(action.system.setState(res.system));
          dispatch(action.lists.setState(res.lists));
          dispatch(action.todos.setState(res.todos));
          navigate("/home");
        });
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
      className="relative top-0 left-0 w-screen h-screen bg-slate-300 dark:bg-zinc-900 opacity-0 z-50 flex justify-center items-center"
    >
      <div className="flex justify-center items-center flex-col">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-48"
          src={require("../../assets/images/splash.png")}
          alt="logo"
        />
      </div>
      <div className="absolute bottom-32">
        <Oval
          height={42}
          width={42}
          strokeWidth={6}
          color="#0079DF"
          secondaryColor="rgba(255, 255, 255, 0.49)"
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
