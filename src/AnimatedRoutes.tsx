import App from "./App";
import { Route, Routes, useLocation, Navigate, Outlet } from "react-router";
import { AnimatePresence } from "framer-motion";
import Authentication from "./components/authentication/Authentication";
import OnBoarding from "./components/OnBoarding/on-boarding";
import LoadingScreen from "./components/components/loadingScreen";
import { useAppSelector } from "./hooks";
import "./firebase/firebase";
import useDeviceDetect from "./hooks/useMobileDetect";

const AnimatedRoutes = () => {
  const location = useLocation();
  const global = useAppSelector((state) => state.system);

  const { isMobile } = useDeviceDetect();

  return !isMobile ? (
    <div className={global.THEME === "Dark" ? "dark" : ""}>
      <div className="w-screen h-screen bg-slate-300 dark:bg-zinc-900">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LoadingScreen />} />
            <Route path="/login" element={<Authentication />} />

            <Route
              path="/newUser"
              element={
                <ProtectedRoute>
                  <OnBoarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-300 dark:bg-zinc-900 ">
      <div className="flex flex-col justify-center items-center">
        <div className="p-4 flex w-max mb-4 justify-center items-center rounded-2xl backdrop-blur-md bg bg-white/60">
          <img
            className="w-24"
            src={require("./assets/images/desktop.png")}
            alt="desktop-svg"
          />
        </div>
        <p className="w-[300px] text-center font-['VarelaRound']">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 duration-300">
            Etonote
          </span>{" "}
          is not optimized for smaller screens. To use{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 duration-300">
            Etonote
          </span>{" "}
          use a desktop.
        </p>
      </div>
    </div>
  );
};

interface props {
  children?: JSX.Element;
}

const ProtectedRoute = ({ children }: props) => {
  const user = useAppSelector((state) => state.user);
  if (user.user_id === null && user.userName === null) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

export default AnimatedRoutes;
