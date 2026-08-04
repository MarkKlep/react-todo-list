"use client";

import { useState } from "react";
import { TodoList } from "./components/TodoList";
import { useAppDispatch } from "./store/hooks";
import { addTodo } from "./store/todosSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    setInputValue("");
    dispatch(addTodo(inputValue));
  };

  return (
    <div>
      <form
        className="mx-auto mt-4 flex max-w-md gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          handleAddTodo();
        }}
      >
        <input
          className="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add Todo
        </button>
      </form>
      <div className="mt-4 mx-auto max-w-md">
        <TodoList />
      </div>
    </div>
  );
}
