import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
