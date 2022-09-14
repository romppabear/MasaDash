import { socket } from "./connectWS";
import WS_EventPlayer from "./player";

export interface WS_ChatEvent {
    player: WS_EventPlayer
    data: string
    server: string
}

type SubscriptionUpdateFunction = (data: WS_ChatEvent) => void;

function chatListener(event: MessageEvent, server: string, update: SubscriptionUpdateFunction) {
  const data = JSON.parse(event.data);
  if (data.eventType === "chat" && data.server === server) {
    update(data);
  }
}

export function subscribeToChat(server: string, update: SubscriptionUpdateFunction) {
  socket.addEventListener("message", event => chatListener(event, server, update));
}
export function unSubscribeFromChat(server: string, update: SubscriptionUpdateFunction) {
  socket.removeEventListener("message", event => chatListener(event, server, update));
}