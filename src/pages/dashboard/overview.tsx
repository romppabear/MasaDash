import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import PlayerList from "../../components/PlayerList";
import StatusControl from "../../components/StatusControl";
import ValueTile from "../../components/ValueTile";
import changeServerName from "../../utils/changeServerName";
import { fetchServer, ServerMeta } from "../../utils/fetchServer";

import styles from "../css/overview.module.css";
import DashboardLayout from "./Layout";

export default function DashboardOverviewPage() {

    const [serverMeta, setServerMeta] = useState<ServerMeta | null>(null)
    const [serverName, setServerName] = useState("Loading...");
    const [isNameEditable, setNameEditable] = useState(false);

    const nameInputRef = useRef<HTMLInputElement>(null);

    const { tag } = useParams() as { tag: string };

    useEffect(() => {
        fetchServer(tag).then(meta => {
            setServerMeta(meta);
            setServerName(meta.name);
        });
    }, [tag]);

    useEffect(() => {
        if (isNameEditable) {
            nameInputRef.current?.focus();
        }
    });

    return (
        <DashboardLayout pageName={"Overview"}>
            <form onSubmit={async e => {
                e.preventDefault()
                try {
                    await changeServerName(tag, serverName);
                    setServerMeta(oldMeta => {
                        if (oldMeta) {
                            return {...oldMeta, name: serverName}
                        }
                        return null;
                    });
                    setNameEditable(false);
                } catch (err) {}
            }}>
                <button type="button" className="material-symbols-outlined" onClick={e => setNameEditable(!isNameEditable)}>
                    edit
                </button>
                <input disabled={!isNameEditable} ref={nameInputRef} className={styles.headerInput} value={serverName} onChange={e => setServerName(e.target.value)} maxLength={20} />
                
                <div className={styles.editSaveCancel} style={{
                    display: !isNameEditable ? "none" : "flex"
                }}>
                    <button type="reset" className={styles.editCancel} onClick={() => {
                        setServerName(serverMeta?.name || "");
                        setNameEditable(false);
                    }}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
            <StatusControl tag={tag} />
            <div className={styles.tiles}>
                <ValueTile valueName={"Processor"} value={"56%"} percentage={0.56} />
                <ValueTile valueName={"Memory"} value={"79%"} percentage={0.79} />
                <ValueTile valueName={"Players"} value={"4/20"} percentage={4 / 20} />
            </div>
            <h2>Players</h2>
            <PlayerList/>
        </DashboardLayout>
    )
}