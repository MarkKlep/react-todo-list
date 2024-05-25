import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, editTodo } from '../store/todosReducers';

const TodoItem = ({id, title, completed}) => {

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={() => dispatch(toggleTodo({id}))}/>
      {isEditing ? <input type="text" value={title} onChange={(e) => dispatch(editTodo({id, title: e.target.value}))}/> : <span>{title}</span>}
      <button onClick={() => dispatch(removeTodo({id}))}>Delete</button>
      <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}

export default TodoItem
