import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DarkThemeProvider from "./components/Shared/DarkThemeProvider";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DarkThemeProvider>
    <App />
  </DarkThemeProvider>
);