import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { TodoContextProivider } from "./context/context.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TodoContextProivider>
        <Provider store={store}>
          <App />
        </Provider>
      </TodoContextProivider>
    </BrowserRouter>
  </React.StrictMode>
);
