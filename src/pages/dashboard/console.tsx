import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import StatusControl from "../../components/StatusControl";
import { subscribeToServerConsole, unSubscribeFromServerConsole } from "../../utils/serverConsole";
import { startServer, stopServer } from "../../utils/serverControl";
import DashboardLayout from "./Layout";

import styles from "../css/console.module.css";
import { sendCommand } from "../../utils/sendCommand";
import DashboardChatPage from "./chat";

export default function DashboardConsolePage() {

  const [consoleData, setServerConsole] = useState<string[]>([]);
  const [commandInput, setCommandInput] = useState("");
  const [currentTab, setCurrentTab] = useState(0);

  const consoleElement = useRef<HTMLDivElement>(null)

  const { tag } = useParams() as { tag: string };

  useEffect(() => {
    function handleConsoleUpdate(data: string) {
      setServerConsole((oldConsole) => {
        if (data === oldConsole[oldConsole.length - 1]) {
          return oldConsole;
        }
        return [...oldConsole, data]
      });
    }
    subscribeToServerConsole(tag, handleConsoleUpdate);
    return function cleanup() {
      unSubscribeFromServerConsole(tag, handleConsoleUpdate);
    };
  }, [tag]);

  useEffect(() => {
    if (consoleElement.current) {
      consoleElement.current.scrollTop = consoleElement.current.scrollHeight;
    }
  })

  return (
    <DashboardLayout pageName="Console &#38; Chat">
      <StatusControl tag={tag} />
      <div className={styles.console}>
        <div className={styles.tabButtons}>
          <button className={`${styles.tabButton} ${currentTab == 0 ? styles.tabButtonActive : ""}`} onClick={() => setCurrentTab(0)}>Console</button>
          <button className={`${styles.tabButton} ${currentTab == 1 ? styles.tabButtonActive : ""}`} onClick={() => setCurrentTab(1)}>Chat</button>
        </div>
        {
          (function () {
            if (currentTab == 0) return (
              <>
                <div className={styles.consoleText} ref={consoleElement}>
                  <button className={styles.clearBtn} onClick={() => setServerConsole([])}>Clear</button>
                  {consoleData.map((line, index) => <p key={index}>{(function () {
                    const syntaxMatch = line.match(/^\[.{1,}\/INFO\]: /)
                    if (syntaxMatch && syntaxMatch[0]) {
                      return <><span className={styles.infoLog}>{syntaxMatch[0]}</span>{line.substring(syntaxMatch[0].length)}</>
                    }

                    return <>{line}</>
                  })()}</p>)}
                </div>
                <form className={styles.form} onSubmit={(e) => {
                  e.preventDefault();
                  sendCommand(commandInput, tag);
                  setCommandInput("");
                }}>
                  <input className={styles.consoleIn} value={commandInput} onChange={e => setCommandInput(e.target.value)} type="text" placeholder="Enter commands to the server" maxLength={300} />
                  <input type="submit" value="Send" />
                </form>
              </>
            );

            return <DashboardChatPage/>
          })()
        }
      </div>
    </DashboardLayout>
  )
}