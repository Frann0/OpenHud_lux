import { useEffect } from "react";
import { io } from "socket.io-client";
import { actions } from "./actions";

/**
 * Bridges server-side actions (from Electron/global shortcuts/etc)
 * into the HUD ActionManager.
 */
export default function ActionBridge() {
  useEffect(() => {
    // If running inside normal browser dev without server, don't crash
    const serverUrl = "http://localhost:1349";

    const socket = io(serverUrl, {
      transports: ["websocket"], // avoids polling noise
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("[HUD] socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("[HUD] socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.log("[HUD] socket error:", err.message);
    });

    /**
     * 🔥 THIS is the important part
     * When Electron/server emits:
     *   io.emit("hudAction", { type: "radarBigger" })
     */
    socket.on("hudAction", (payload: { type: string; data?: unknown }) => {
      console.log("[HUD] hudAction received:", payload);

      // Trigger your HUD action system
      actions.execute(payload.type, payload.data);
    });

    // cleanup
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  return null;
}
