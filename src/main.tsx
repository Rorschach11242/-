import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 如果要自定义全局CSS可在此import

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
