import { socket } from "./connectWS";

type SubscriptionUpdateFunction = (data: string) => void;

function serverConsoleListener(event: MessageEvent, server: string, update: SubscriptionUpdateFunction) {
  const data = JSON.parse(event.data);
  if (data.eventType === "serverConsole" && data.server === server) {
    update(data.data);
  }
}

export function subscribeToServerConsole(server: string, update: SubscriptionUpdateFunction) {
  socket.addEventListener("message", event => serverConsoleListener(event, server, update));
}
export function unSubscribeFromServerConsole(server: string, update: SubscriptionUpdateFunction) {
  socket.removeEventListener("message", event => serverConsoleListener(event, server, update));
}