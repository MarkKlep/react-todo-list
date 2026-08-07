"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import { addTodos } from "./todosSlice";
import { TTodo } from "../types/todo";

const generateRandomTodos = (): TTodo[] => {
  const todos: TTodo[] = [];
  for (let i = 0; i < 10000; i++) {
    todos.push({
      id: crypto.randomUUID(),
      title: `Todo ${i + 1}`,
      isDone: Math.random() > 0.5,
    });
  }
  return todos;
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());

  useEffect(() => {
    store.dispatch(addTodos(generateRandomTodos()));
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
