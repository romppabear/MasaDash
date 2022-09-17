import styles from "./css/PlayerList.module.css";

export default function PlayerList() {
    return (
        <ul className={styles.container}>
            <li className={styles.player}>
                <div>
                    <p className={styles.playerName}>player1</p>
                    <div className={styles.circle}></div>
                </div>
                <div>
                    <button>Ban</button>
                    <button>Kick</button>
                </div>
            </li>
        </ul>
    )
}