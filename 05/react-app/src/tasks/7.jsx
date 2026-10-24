// WHAT: This function returns a string that will be rendered
const PrintHello = () => {
    return <h1>I Love React</h1>;
}

export default function Task_7() {
    return (
        <>
            <div className="task-container border-2 border-indigo-600">
                <h1>Задание 7</h1>
                {PrintHello()}
            </div>
        </>
    )
}