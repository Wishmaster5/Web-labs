const customer = {
    first_name: 'Bob',
    last_name: 'Dylan'
};

console.log(customer.first_name);

export default function Task_2() {
    return (
        <>
            <div className="border-2 border-indigo-600 task-container">
                <h1>Задание 2</h1>
                <h1>My name is {customer.first_name}</h1>
                <h2>My last name is {customer.last_name}</h2>
            </div>
        </>
    )
}