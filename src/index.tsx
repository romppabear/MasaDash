import React from "react";
import ReactDOM from "react-dom/client";
import ServerList from "./components/ServerList";
import ServerStatusIndicator from "./components/SeverStatusIndicator";
import connect from "./utils/connectWS";

import "./css/index.css";
import IndexPage from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardOverviewPage from "./pages/dashboard/overview";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage/>} />
      <Route path="/dashboard/overview/:tag" element={<DashboardOverviewPage/>} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

connect()