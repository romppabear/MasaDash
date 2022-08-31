import React from "react";
import ReactDOM from "react-dom/client";
import ServerList from "./components/ServerList";
import ServerStatusIndicator from "./components/SeverStatusIndicator";
import connect from "./utils/connectWS";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <ServerStatusIndicator server={"_dc9a8eDJ"} /> */}
    <ServerList/>
  </React.StrictMode>
);

connect()