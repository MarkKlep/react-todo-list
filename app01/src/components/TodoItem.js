import React from 'react'

const TodoItem = ({id, title, completed, toggleTodo, removeTodo}) => {
  return (
    <li>
        <input 
            type="checkbox" 
            checked={completed} 
            onChange={()=>toggleTodo(id)}
        />
        <span>{title}</span>
        <button
            className="deleteTodo"
            onClick={()=>removeTodo(id)}
        >
            &times;
        </button>
    </li>
  )
}

export default TodoItem
