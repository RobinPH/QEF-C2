import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AccountProvider } from "./context/account";
import { BackendProvider } from "./context/backend";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <BackendProvider>
          <App />
        </BackendProvider>
      </AccountProvider>
    </BrowserRouter>
  </React.StrictMode>
);
