import App from "./App";
import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import Authentication from "./components/authentication/Authentication";
import OnBoarding from "./components/OnBoarding/on-boarding";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Authentication />} />
        <Route path="/newUser" element={<OnBoarding />} />
        <Route path="/home" element={<App />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
