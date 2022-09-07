import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import StatusControl from "../../components/StatusControl";
import { subscribeToServerConsole, unSubscribeFromServerConsole } from "../../utils/serverConsole";
import { startServer, stopServer } from "../../utils/serverControl";
import DashboardLayout from "./Layout";

import styles from "../css/console.module.css";

export default function DashboardConsolePage() {

  const [consoleData, setServerConsole] = useState<string[]>([]);

  const consoleElement = useRef<HTMLDivElement>(null)

  const { tag } = useParams() as { tag: string };

  useEffect(() => {
    function handleConsoleUpdate(data: string) {
      setServerConsole((oldConsole) => [...oldConsole.slice(0, 250), data]);
      // console.log(data)
    }
    subscribeToServerConsole(tag, handleConsoleUpdate);
    return function cleanup() {
      unSubscribeFromServerConsole(tag, handleConsoleUpdate);
    };
  }, []);

  useEffect(() => {
    if (consoleElement.current) {
      consoleElement.current.scrollTop = consoleElement.current.scrollHeight;
    }
  })

  return (
    <DashboardLayout pageName="Console">
      <StatusControl tag={tag}/>
      <div className={styles.console} ref={consoleElement}>
        {consoleData.map((line, index) => <p key={index}>{line}</p>)}
      </div>
    </DashboardLayout>
  )
}