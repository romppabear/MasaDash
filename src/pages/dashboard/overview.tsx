import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ServerStatusIndicator from "../../components/SeverStatusIndicator";
import { fetchServer, ServerMeta } from "../../utils/fetchServer";
import { startServer, stopServer } from "../../utils/serverControl";

export default function DashboardOverviewPage() {

    const [ serverMeta, setServerMeta ] = useState<ServerMeta | null>(null)

    const { tag } = useParams() as { tag: string };

    useEffect(() => {
        fetchServer(tag).then(meta => setServerMeta(meta));
    }, []);

    return (
        <div>
            {serverMeta?.name}
            <button onClick={() => startServer(tag)}>Start</button>
            <button onClick={() => stopServer(tag)}>Stop</button>
            <button>Restart</button>
            <ServerStatusIndicator server={tag}/>
        </div>
    )
}