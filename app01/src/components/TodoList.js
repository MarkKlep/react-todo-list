import React from 'react'
import TodoItem from './TodoItem'

const TodoList = (props) => {

  const {todos, removeTodo, toggleTodo} = props;

  return (
    <ul>
        {
          todos.map(todo=>
            <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} removeTodo={removeTodo}/>
          )
        }
    </ul>
  )
}

export default TodoList
