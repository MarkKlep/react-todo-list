import './App.css';

import { useState } from 'react';

function App() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if(text.trim()) {
      setTodos(
        [
          ...todos,
          {
            id: Date.now(),
            title: text,
            completed: false
          }
        ]
      );
      setText('');
    }
  }

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo=>{
      if(id!==todo.id) 
        return todo;
      return ({
        ...todo, completed: !todo.completed
      });
    }));
  }

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter(todo=>todo.id!==id));
  }

  return (
    <div className="App">
      
      <input
        type="text"
        value={text}
        onChange={e=>setText(e.target.value)} 
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {
          todos.map(todo=>
          <li key={todo.id}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={()=>handleToggleTodo(todo.id)}
            />
            <span>{todo.title}</span>
            <button
              className="deleteTodo"
              onClick={()=>handleRemoveTodo(todo.id)}
            >
              &times;
            </button>
          </li>)
        }
      </ul>

    </div>
  );
}

export default App;
