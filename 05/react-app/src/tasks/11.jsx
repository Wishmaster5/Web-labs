import { useState } from "react"

const styles_btn = {
    "background-color": "yellow",
    "color": "black",
    "border": "none"
}

const styles_span = {
    "background-color": "red"
}

export default function Task_11() {
    const [alerts, setAlerts] = useState(0);
    return (
        <>
            <div className="task-container border-2 border-indigo-600">
                <h1>Задание 11</h1>
                <button type="button" className="btn btn-primary" style={styles_btn} onClick={() => { setAlerts(alerts + 1) }}>
                    Alerts <span className="badge" style={styles_span}>{alerts}</span>
                </button>
                <p>Button was clicked {alerts} times</p>
            </div>
        </>
    )
}