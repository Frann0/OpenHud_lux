import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ActionBridge from "./API/contexts/ActionsBridge.tsx";
// import * as process from "process";
// globalThis.process = process;
// declare global {
//   interface Window {
//     ipcApi: {
//       send: (channel: string, ...arg: any) => void;
//       receive: (channel: string, func: (...arg: any) => void) => void;
//     };
//   }
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <ActionBridge />
    <App />
  </React.StrictMode>
);
