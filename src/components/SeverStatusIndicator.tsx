import { useEffect, useState } from "react";
import { subscribeToServerStatus } from "../utils/connectWS";

export default function ServerStatusIndicator(props: { server: string }) {

    const [isJoinable, setIsJoinable] = useState(false);

    useEffect(() => {
        function handleStatusChange(status: boolean) {
            setIsJoinable(status);
        }
        subscribeToServerStatus(props.server, handleStatusChange);
        // Specify how to clean up after this effect:
        return function cleanup() {
            // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });

    return (
        <p>{isJoinable ? "Online" : "Offline"}</p>
    )
}