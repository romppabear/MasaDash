import styles from "./css/ValueTile.module.css";

export default function ValueTile(props: {valueName: string, value: string, percentage: number}) {
    return (
        <div className={styles.container}>
            <div className={styles.visualPercentage} style={{height: `${props.percentage * 100}%`}}></div>
            <div className={styles.valueContainer}>
                <p className={styles.value}>{props.value}</p>
                <p className={styles.valueName}>{props.valueName}</p>
            </div>
        </div>
    )
}