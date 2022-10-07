import App from "./App";

import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import Authentication from "./components/authentication/Authentication";
import OnBoarding from "./components/OnBoarding/on-boarding";
import LoadingScreen from "./components/components/loadingScreen";
import { useAppSelector } from "./hooks";
import "./firebase/firebase";

const AnimatedRoutes = () => {
  const location = useLocation();
  const global = useAppSelector((state) => state.system);

  return (
    <div className={global.THEME === "Dark" ? "dark" : ""}>
      <div className="w-screen h-screen bg-slate-300 dark:bg-zinc-800">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LoadingScreen />} />
            <Route path="/login" element={<Authentication />} />
            <Route path="/newUser" element={<OnBoarding />} />
            <Route path="/home" element={<App />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedRoutes;
