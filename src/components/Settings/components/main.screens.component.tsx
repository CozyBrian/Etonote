import React from "react";
import { action } from "../../../redux";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { AnimatePresence, motion } from "framer-motion";
import { logOutUser } from "../../../services/authentication";
import { useNavigate } from "react-router-dom";

type Props = {
  tabs: { id: string; title: string }[];
};

const MainSettings = ({ tabs }: Props) => {
  const appState = useAppSelector((state) => state.app);

  const selectedTab = tabs.find(
    (tab) => tab.id === appState.selectedSettingsTab
  );

  return (
    <div className="flex w-full h-full flex-col p-2">
      <div className="text-2xl font-semibold pb-1">{selectedTab?.title}</div>
      <div className="relative flex h-full flex-col justify-between ">
        <AnimatePresence mode="wait">
          {selectedTab?.id === tabs[0].id && <Personal key={tabs[0].id} />}
          {selectedTab?.id === tabs[1].id && <Appearance key={tabs[1].id} />}
        </AnimatePresence>
        <div className="absolute text-center w-full mx-auto -bottom-8 text-slate-400">
          Etonote v0.1.1p(web)
        </div>
      </div>
    </div>
  );
};

const Personal = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    window.localStorage.removeItem("persistantState");
    localStorage.removeItem("persistantState");
    if (user.user_id) {
      logOutUser()
        .then(() => {
          dispatch(action.app.setShowSettingsPanel());
          dispatch(action.user.setUserLogout());
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const ClearStorage = () => {
    window.localStorage.removeItem("persistantState");
    localStorage.removeItem("persistantState");
    console.log("Cleared");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.08 }}
      className="flex flex-col gap-4"
    >
      <div>
        Username:
        <span>{user.userName}</span>
      </div>
      <div>
        Email:
        <span>{user.userEmail}</span>
      </div>
      <div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 active:bg-red-600 text-white px-6 py-2 rounded-lg duration-200"
        >
          Logout
        </button>
      </div>
      <div>
        <button
          onClick={ClearStorage}
          className="border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-700 text-red-500 active:text-white px-6 py-2 rounded-lg duration-200"
        >
          Clear Storage
        </button>
      </div>
    </motion.div>
  );
};

const Appearance = () => {
  const dispatch = useAppDispatch();
  const setTheme = (theme: string) => {
    return dispatch(action.system.setTheme(theme));
  };

  const themes = [{ title: "Light" }, { title: "Dark" }];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.08 }}
      className="flex flex-col h-full w-full"
    >
      <div className="text-xl font-normal text-gray-700 dark:text-gray-300 pb-1">
        Theme
      </div>
      <div className="flex flex-row w-full gap-4">
        {themes.map((theme, i) => (
          <div
            key={i}
            onClick={() => setTheme(theme.title)}
            className="active:scale-95 duration-100"
          >
            <div className="w-[200px] h-[150px] rounded-lg bg-slate-300 dark:bg-slate-700"></div>
            {theme.title}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MainSettings;
