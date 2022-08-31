import { useEffect, useState } from "react";
import { ServerStatus, subscribeToServerStatus, unSubscribeFromServerStatus } from "../utils/serverStatus";

export default function ServerStatusIndicator(props: { server: string }) {

    const [serverStatus, setServerStatus] = useState(ServerStatus.Offline);

    useEffect(() => {
        function handleStatusChange(status: ServerStatus) {
            setServerStatus(status);
        }
        subscribeToServerStatus(props.server, handleStatusChange);
        return function cleanup() {
            unSubscribeFromServerStatus(props.server, handleStatusChange);
        };
    });

    return (
        <p>{serverStatus === ServerStatus.Online ? "Online" : "Offline"}</p>
    )
}