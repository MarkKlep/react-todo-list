"use client";

import { useState } from "react";
import { TodoList } from "./components/TodoList";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { addTodo, toggleTodoStatus, deleteTodo } from "./store/todosSlice";

export default function Home() {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    setInputValue("");
    dispatch(addTodo(inputValue));
  };

  const handleChangeStatus = (id: string) => {
    dispatch(toggleTodoStatus(id));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <div className="mx-auto mt-4 flex max-w-md gap-2">
        <input
          className="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
      </div>
      <div className="mt-4 mx-auto max-w-md">
        <TodoList
          todos={todos}
          handleChangeStatus={handleChangeStatus}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}
