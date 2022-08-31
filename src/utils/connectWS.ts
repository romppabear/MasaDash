export let socket: WebSocket;

export default function connect() {
    console.log("Connecting...")
    // Create WebSocket connection.
    socket = new WebSocket("ws://localhost:3000/dash");
    console.log(socket)
    // Connection opened
    socket.addEventListener("open", (event) => {
        socket.send("Hello Server!");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data);
    });
}

// TODO: typings
// interface BaseEvent {
//     eventType: "join" | "quit" | "serverReady"
// }
// interface SocketServerReadyEvent extends BaseEvent {
//     server: string
//     eventType: "serverReady"
// }

