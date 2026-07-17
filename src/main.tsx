import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/circle-btn.css";
import "./styles/swipe-btn.css";
import "./styles/landing.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
