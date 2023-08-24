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
            <input type="checkbox" />
            <span>{todo.title}</span>
            <button className="deleteTodo">&times;</button>
          </li>)
        }
      </ul>

    </div>
  );
}

export default App;
