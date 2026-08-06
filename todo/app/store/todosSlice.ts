import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTodo } from "../types/todo";

const initialState: Record<string, TTodo> = {};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<TTodo>) => {
        state[action.payload.id] = action.payload;
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
      const ids = action.payload.map((todo) => todo.id);
      const existingIds = Object.keys(state);
      const newIds = ids.filter((id) => !existingIds.includes(id));
      const newTodos = action.payload.filter((todo) => newIds.includes(todo.id));
      Object.assign(state, newTodos.reduce((acc, todo) => { acc[todo.id] = todo; return acc; }, {} as Record<string, TTodo>));
    },
    toggleTodoStatus: (state, action: PayloadAction<string>) => {
      const todo = state[action.payload];
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { addTodos, addTodo, toggleTodoStatus, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
