import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../store/todosReducers';

const TodoItem = ({id, title, completed}) => {

  const dispatch = useDispatch();

  return (
    <li>
        <input 
            type="checkbox" 
            checked={completed} 
            onChange={()=>dispatch(toggleTodo({id}))}
        />
        <span>{title}</span>
        <button
            className="deleteTodo"
            onClick={()=>dispatch(removeTodo({id}))}
        >
            &times;
        </button>
    </li>
  )
}

export default TodoItem
