import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchServerList, ServerListElement } from "../utils/serverList";
import styles from "./css/ServerList.module.css";
import LoadingIndicator from "./LoadingIndicator";
import ServerStatusIndicator from "./SeverStatusIndicator";

export default function ServerList() {

    const [serverList, setServerList] = useState<ServerListElement[] | "error" | null>(null);

    function load() {
        fetchServerList().then(servers => setServerList(servers)).catch(() => setServerList("error"));
    }

    useEffect(() => {
        load()
    }, []);

    return (
        <div className={styles.container}>
            {
                serverList ? <h1 className={styles.header}>Select the server you want to manage</h1> : <></>
            }
            {
                (function() {
                    if (!serverList) return <LoadingIndicator/>

                    if (serverList === "error") return <>
                        <p>Loading server list failed.</p>
                        <button onClick={() => {
                            setServerList(null);
                            load()
                        }}>Try Again</button>
                    </>;

                   return serverList.map(gameServer => {
                        return (
                            <Link style={{width: "100%"}} to={`/dashboard/overview/${gameServer.tag}`} key={gameServer.tag}>
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