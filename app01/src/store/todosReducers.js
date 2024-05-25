import { createSlice } from '@reduxjs/toolkit';

const todosReducers = createSlice({
    name: 'todosSlice',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                id: Date.now(), 
                title: action.payload.text,
                completd: false
            });
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(item=>action.payload.id===item.id);
            todo.completd = !todo.completd;
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo=>todo.id!==action.payload.id)
        },
        editTodo: (state, action) => {
            const todo = state.todos.find(item=>action.payload.id===item.id);
            todo.title = action.payload.title;
        }
    }
});

export const {addTodo, toggleTodo, removeTodo, editTodo} = todosReducers.actions;
export default todosReducers.reducer;