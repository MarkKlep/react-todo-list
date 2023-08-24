import './App.css';
import TodoList from './components/TodoList';
import InputField from './components/InputField';
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
    
      <InputField text={text} addText={setText} addTodo={handleAddTodo}/>
      <TodoList todos={todos} toggleTodo={handleToggleTodo} removeTodo={handleRemoveTodo}/>

    </div>
  );
}

export default App;
