import {  useState, useRef } from 'react';

import '../styles.css';
import List from '../List';

function Todo () {
    const [input, setInput] = useState('');
    const [list, setList] = useState(["Clean house", "Cut glasses", "Clean toilet", "Go shopping", "Learn React"])
    const [doneList, setDoneList] = useState([])
    const [doneBtnClassName, setDoneBtnClassName] = useState('done-btn')
    const [isChecked, setIsChecked] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState('')

    const inputRef = useRef()

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    //Enter to add todo job
    const handleEnterToAdd = (e,id) => {
        if (isEdit && (e.key === "Enter")){
            list[id] = input
            setList(list)
            setInput('')
            setIsEdit(false)
        } else if (e.key === "Enter") {
            list.push(input)
            setInput('')
            setList(list)

        }     
    }

    //Click to add todo job
    const handleClickToAdd = (id) => {
        if (isEdit) {
            list[id] = input
            setList(list)
            setInput('')
            setIsEdit(false)
        } else {
            list.push(input)
            setInput('')
            setList(list)
        } 
    }

    //Handle when click done
    const handleDoneList = (id,e) => {
        if(e.target.checked === true) {
            const arrayList = [...list]
            const arrayDoneList = [...doneList]
            const removeItem =  arrayList.splice(id,1)
            arrayDoneList.push(removeItem)
            setList(arrayList)
            setDoneList(arrayDoneList)
            setDoneBtnClassName('done-btn done disabled')
            setIsChecked(true)
        } else {
            setDoneBtnClassName('done-btn')
        }
    }

    //Remove job from list
    const handleRemoveItem = (id) => {
        console.log(id)
        const newArray = [...list]
        newArray.splice(id,1)
        console.log(newArray)
        setList(newArray)
    }

    //Remove job from done list
    const handleRemoveDoneItem = (id) => {
        const newArray = [...doneList]
        newArray.splice(id,1)
        setDoneList(newArray)
    }

    //Handle prio job to top of the list
    const handlePrio = (id) => {
        const newArray = [...list]
        const removeItem = newArray.splice(id,1)
        newArray.unshift(removeItem)
        setList(newArray)
    }

    //Click to save edit job
    const handleClickToSave = (id) => {
        list[id] = input
        setList(list)
        setInput('')
        setIsEdit(false)
    }

    //Edit to do job
    const handleEdit = (id) => {
        setEditId(id)
        inputRef.current.value= list[id]
        setInput(list[id])
        setIsEdit(true)
    }

    return (
     <div className="wrapper">
        <div className="content">
            <h2>Todo List</h2>
            <div className="input-wrapper">
                <input ref={inputRef} onKeyDown={e => handleEnterToAdd(e, editId)} onChange={handleChange} value={input} className="input" type="text"/> 
                {isEdit 
                ?  
                (<button onClick={() => handleClickToAdd(editId)} className="add">Save</button>)  
                : 
                (<button onClick={() => handleClickToAdd(editId)} className="add">Add </button>)}
            </div>
            <div className="tasks-list-wrapper">
                <ul className="tasks-list">
                    {list.map((item, index) => <List
                        handleEdit={handleEdit}
                        handlePrio={handlePrio}
                        handleRemoveItem={handleRemoveItem} 
                        handleDoneList={handleDoneList} 
                        key={index} 
                        id={index} 
                        data={item}
                    />)}
                </ul>
            </div>
            <div className="done-tasks-list-wrapper">
                <ul className="done-tasks-list">
                    {doneList.map((item, index) => <List 
                        handleRemoveItem={handleRemoveDoneItem} 
                        isChecked={isChecked} 
                        doneClass={doneBtnClassName} 
                        key={index} 
                        id={index} 
                        data={item}
                    />)}
                </ul>
            </div>
        </div>
    </div>
    )
}

export default Todo;