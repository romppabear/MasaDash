import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchServerList, ServerListElement } from "../utils/serverList";
import styles from "./css/ServerList.module.css";
import ServerStatusIndicator from "./SeverStatusIndicator";

export default function ServerList() {

    const [serverList, setServerList] = useState<ServerListElement[] | null>(null);

    useEffect(() => {
        fetchServerList().then(servers => setServerList(servers));
    }, []);

    return (
        <div className={styles.container}>
            {
                (function() {
                    if (!serverList) return "Loading..."

                   return serverList.map(gameServer => {
                        return (
                            <Link to={`/dashboard/overview/${gameServer.tag}`} key={gameServer.tag}>
                                <div className={styles.gameServer}>
                                    <span>{gameServer.name}</span>
                                    <ServerStatusIndicator server={gameServer.tag}/>
                                </div>
                            </Link>
                        )
                   });
                })()
            }
        </div>
    )
}