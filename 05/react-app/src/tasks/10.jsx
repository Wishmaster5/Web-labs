const styles_btn = {
    "background-color": "yellow",
    "color": "black",
    "border": "none"
}

const styles_span = {
    "background-color": "red"
}

export default function Task_10() {
    return (
        <>
            <div className="task-container border-2 border-indigo-600">
                <h1>Задание 10</h1>
                <button type="button" className="btn btn-primary" style={styles_btn}>
                    Alerts <span className="badge" style={styles_span}>4</span>
                </button>
            </div >
        </>
    )
}