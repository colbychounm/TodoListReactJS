function List ({id, data, handleDoneList, handleRemoveItem , doneClass, isChecked, handlePrio, handleEdit}) {

    return (
        <div className="task">
            <input type="checkbox" checked={isChecked || false} onChange={e => handleDoneList(id,e)} className={doneClass || 'done-btn'}/>
            <li className="task-detail">{data}</li>
            <div className="btns">
                {/* <span className="options"> */}
                    {/* <i className="fas fa-caret-down"></i> */}
                    {/* <div className="editremove"> */}
                <i onClick={() => handlePrio(id)} className="fas fa-star"></i>
                <i onClick={() => handleEdit(id)} className="fas fa-edit edit"></i>
                <i onClick={() => handleRemoveItem(id)} className="fas fa-trash remove"></i>
                    {/* </div> */}
                {/* </span> */}
            </div>     
        </div>
    )
}

export default List