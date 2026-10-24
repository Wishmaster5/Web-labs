const animals = ['Horse', 'Turtle', 'Elephant', 'Monkey'];

export default function Task_5() {
    return (
        <>
            <div className="task-container border-2 border-indigo-600">
                <h1>Задание 5</h1>
                <ol>
                    {animals.map((animal, i) => {
                        return <li key={i}>{animal}</li>
                    })}
                </ol>
            </div>
        </>
    )
}