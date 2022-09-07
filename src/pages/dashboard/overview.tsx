import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import ServerStatusIndicator from "../../components/SeverStatusIndicator";
import StatusControl from "../../components/StatusControl";
import ValueTile from "../../components/ValueTile";
import { fetchServer, ServerMeta } from "../../utils/fetchServer";
import { startServer, stopServer } from "../../utils/serverControl";

import styles from "../css/overview.module.css";
import DashboardLayout from "./Layout";

export default function DashboardOverviewPage() {

    const [ serverMeta, setServerMeta ] = useState<ServerMeta | null>(null)

    const { tag } = useParams() as { tag: string };

    useEffect(() => {
        fetchServer(tag).then(meta => setServerMeta(meta));
    }, []);

    return (
        <DashboardLayout pageName={"Overview"}>
            <h1>{serverMeta ? serverMeta.name : "Loading..."}</h1>
                <StatusControl tag={tag}/>
                <div className={styles.tiles}>
                    <ValueTile valueName={"Processor"} value={"56%"} percentage={0.56}/>
                    <ValueTile valueName={"Memory"} value={"79%"} percentage={0.79}/>
                    <ValueTile valueName={"Players"} value={"4/20"} percentage={4/20}/>
                </div>
        </DashboardLayout>
    )
}