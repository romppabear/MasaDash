import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ServerStatusIndicator from "../../components/SeverStatusIndicator";
import ValueTile from "../../components/ValueTile";
import { fetchServer, ServerMeta } from "../../utils/fetchServer";
import { startServer, stopServer } from "../../utils/serverControl";

import styles from "../css/overview.module.css";

export default function DashboardOverviewPage() {

    const [ serverMeta, setServerMeta ] = useState<ServerMeta | null>(null)

    const { tag } = useParams() as { tag: string };

    useEffect(() => {
        fetchServer(tag).then(meta => setServerMeta(meta));
    }, []);

    return (
        <div>
            <div className={styles.content}>
                <h1>{serverMeta?.name}</h1>
                <div className={styles.control_buttons}>
                    <ServerStatusIndicator server={tag}/>
                    <button onClick={() => startServer(tag)}>Start</button>
                    <button onClick={() => stopServer(tag)}>Stop</button>
                    <button>Restart</button>
                </div>
                <ValueTile valueName={"Players"} value={"6/20"} percentage={6/20}/>
            </div>
        </div>
    )
}