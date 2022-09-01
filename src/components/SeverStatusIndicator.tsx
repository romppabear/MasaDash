import { useEffect, useState } from "react";
import { ServerStatus, subscribeToServerStatus, unSubscribeFromServerStatus } from "../utils/serverStatus";

import styles from "./css/ServerStatusIndicator.module.css";

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
    }, []);

    return (
        <div className={styles.circle} style={{background: serverStatus === ServerStatus.Online ? "green" : "grey"}}></div>
    )
}