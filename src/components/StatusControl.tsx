import { startServer, stopServer } from "../utils/serverControl";
import ServerStatusIndicator from "./SeverStatusIndicator";

import styles from "./css/StatusControl.module.css";

export default function StatusControl(props: { tag: string }) {
  return (
    <div className={styles.container}>
      <ServerStatusIndicator server={props.tag} />
      <button onClick={() => startServer(props.tag)}>Start</button>
      <button onClick={() => stopServer(props.tag)}>Stop</button>
      <button>Restart</button>
    </div>
  )
}