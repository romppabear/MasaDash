import ServerList from "../components/ServerList";

import styles from "./css/index.module.css";

export default function IndexPage() {
    return (
        <div>
            <div className={styles.navbar}>
                <img src={`${process.env.PUBLIC_URL + "/assets/masa_logo_white.svg"}`} alt="Masa Logo" width={200}/>
            </div>
            <div className={styles.server_list}>
                <h1 className={styles.header}>Select the server you want to manage</h1>
                <ServerList/>
            </div>
        </div>
    )
}