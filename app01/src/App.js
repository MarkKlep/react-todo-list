import './App.css';
import TodoList from './components/TodoList';
import InputField from './components/InputField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/todosReducers';

function App() {

  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if(text.trim()) {
      dispatch(addTodo({text}))
      setText('');
    }
  }

  return (
    <div className="App">
    
      <InputField text={text} addText={setText} addTodo={handleAddTodo}/>
      <TodoList/>

    </div>
  );
}

export default App;
