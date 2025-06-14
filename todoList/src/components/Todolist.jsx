import { useState } from "react";

function Todolist(props) {
    const list = props.list;
    return (
        <ul>
            {
                list.map((list) => (
                    <li key={list.id}>{list.text}</li>
                ))
            }
        </ul>
    )
}

export default Todolist