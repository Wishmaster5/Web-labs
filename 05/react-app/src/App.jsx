import 'bootstrap/dist/css/bootstrap.css';

import {
  Task_1, Task_2, Task_3, Task_4, Task_5, Task_6, Task_7, Task_8, Alert8,
  SmarterAlert,
  Task_10,
  Task_11
} from './tasks/index';

function App() {


  return (
    <>
      <Task_1 />
      <Task_2 />
      <Task_3 />
      <Task_4 />
      <Task_5 />
      <Task_6 />
      <Task_7 />
      <div className="task-container border-2 border-indigo-600">
        <Task_8
          title="Welcome to react"
          description="React is the most popular rendering library in the world"
          buttonLabel="Go to the official website"
          buttonURL="https://reactjs.org/"
        >
        </Task_8>
        <Alert8 text="OMG! Something really bad has happened!" />
      </div>
      <div className="task-container border-2 border-indigo-600">
        <h1>Задание 9</h1>
        <SmarterAlert color={"red"} text={"OMG! Something really bad has happended!"} show={true} />
        <SmarterAlert color={"yellow"} text={"Well, it is not that bad after all!"} show={true} />
        <SmarterAlert color={"green"} text={"I am supposed to be green"} show={true} />
        <SmarterAlert color={"red"} text={"OMG! Something really bad has happended!"} show={false} />
      </div>
      <Task_10 />
      <Task_11 />
    </>
  )

}

export default App;
