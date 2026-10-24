const navlinkItems = [
    <li className="nav-item">
        <a className="nav-link" href="#">Link to google.com</a>
    </li>,
    <li className="nav-item">
        <a className="nav-link" href="#">Link to facebook.com</a>
    </li>,
    <li className="nav-item">
        <a className="nav-link" href="#">Link to amazon.com</a>
    </li>
];

const content = <ul className="nav">{navlinkItems}</ul>;

export default function Task_4() {
    return (
        <>
            <div className="task-container border-2 border-indigo-600">
                <h1>Задание 4</h1>
                {content}
            </div>
        </>
    )
}