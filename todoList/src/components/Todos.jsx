import { useState } from "react";
import '../Todos.css'
import Todoform from "./Todoform";
import Todolist from "./Todolist";
function Todos() {
    const [title, setTitle] = useState('hello Todos')
    const [list, setList] = useState([
        {
            id: 1,
            text: '吃饭',
            completed: false
        }
    ])
    const onAdd = function (text) {
        setList([
            ...list,
            {
                id: list.length + 1,
                text,
                completed: false
            }
        ])
    }
    return (
        <div className="container">
            <h1>{title}</h1>
            <Todoform onAdd={onAdd} />
            <Todolist list={list} />
        </div>
    )
}

export default Todos