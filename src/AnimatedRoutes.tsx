import App from "./App";
import { Route, Routes, useLocation, Navigate, Outlet } from "react-router";
import { AnimatePresence } from "framer-motion";
import Authentication from "./components/authentication/Authentication";
import OnBoarding from "./components/OnBoarding/on-boarding";
import LoadingScreen from "./components/components/loadingScreen";
import { useAppSelector } from "./hooks";
import "./firebase/firebase";
import TitleBar from "./components/components/title-bar";

const AnimatedRoutes = () => {
  const location = useLocation();
  const global = useAppSelector((state) => state.system);

  return (
    <div className={global.THEME === "Dark" ? "dark" : ""}>
      <div className="flex flex-col h-screen w-screen bg-slate-300 dark:bg-zinc-900">
        <TitleBar />
        <div className="flex h-full">
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
    </div>
  );
};

interface props {
  children?: JSX.Element;
}

const ProtectedRoute = ({ children }: props) => {
  const isProd = process.env.NODE_ENV === "production";
  const user = useAppSelector((state) => state.user);
  if (isProd) {
    if (user.user_id === null && user.userName === null) {
      return <Navigate to="/" replace />;
    }
    return children ? children : <Outlet />;
  } else {
    return children ? children : <Outlet />;
  }
};

export default AnimatedRoutes;
