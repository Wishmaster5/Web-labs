
const planets = ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune'];

export default function Task_6() {
    return (
        <>
            <div className="task-container border-2 border-indigo-600">
                <h1>Задание 6</h1>
                <ul className="list-group m-5">
                    {planets.map((planet, i) => {
                        return <li className="list-group-item" key={i}>{planet}</li>
                    })}
                </ul>
            </div>
        </>
    )
}