import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTodo } from "../types/todo";

const initialState: TTodo[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<TTodo>) => {
        state.push(action.payload);
      },
      prepare: (title: string) => ({
        payload: {
          id: crypto.randomUUID(),
          title,
          isDone: false,
        } satisfies TTodo,
      }),
    },
    addTodos: (state, action: PayloadAction<TTodo[]>) => {
      state.push(...action.payload);
    },
    toggleTodoStatus: (state, action: PayloadAction<string>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodos, addTodo, toggleTodoStatus, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
