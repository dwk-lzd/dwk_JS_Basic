import { useState } from "react";

function Todoform(props) {
    const onAdd = props.onAdd
    const [text, SetText] = useState('')

    const subFrom = function (e) {
        e.preventDefault()
        onAdd(text)
    }
    const changeForm = function (e) {
        SetText(e.target.value)
    }
    return (
        <form action="#" onSubmit={subFrom}>
            <input type="text" placeholder="请输入提交内容" value={text} onChange={changeForm} />
            <button>提交</button>
        </form>
    )
}

export default Todoform