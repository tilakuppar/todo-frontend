import React from 'react'
import './ToDoItem.css'

const ToDoItem = ( {task, onDelete} ) => {
  return (
    <>
        <div className="todoitem container w-75 mb-2">
            <div className="w-75">
                <h5 className='text-decoration-underline'>{task.title}</h5>
                <p>{task.task}</p>
                <small><i>{task.date}</i></small>
            </div>
            <div className="w-25 d-flex  justify-content-evenly align-items-center">
                <input class="form-check-input" type="checkbox" className='bg-dark vh-50' value="" id="flexCheckDefault" />
                <button type="button" className="btn-close" aria-label="Close" onClick={onDelete}></button>
            </div>
        </div>
    </>
  )
}

export default ToDoItem
