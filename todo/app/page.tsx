"use client";

import { useState, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import { useAppDispatch } from "./store/hooks";
import { addTodo, addTodos } from "./store/todosSlice";
import { TTodo } from "./types/todo";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

const generateRandomTodos = () => {
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

export default function Home() {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");

  const [inputSearch, setInputSearch] = useState<string>("");
  const debouncedSearch = useDebouncedValue(inputSearch, 300);
  const [statusFilter, setStatusFilter] = useState<'all' | 'done' | 'not-done'>("all");

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    setInputValue("");
    dispatch(addTodo(inputValue));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };

  const handleChangeStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = event.target.value;
    setStatusFilter(filterValue as 'all' | 'done' | 'not-done');
  };

  useEffect(() => {
    const randomTodos = generateRandomTodos();
    dispatch(addTodos(randomTodos));
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center">
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
        <div className="mt-4">
          <label>
            Search:
            <input
              className="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              type="text"
              value={inputSearch}
              onChange={handleSearchChange}
            />
          </label>
          <label>
            Status:
            <select
              className="ml-2 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              onChange={handleChangeStatusFilter}
              value={statusFilter}
            >
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="not-done">Not Done</option>
            </select>
          </label>
        </div>
      </div>
      <div className="mt-4 mx-auto max-w-md">
        <TodoList searchTerm={debouncedSearch} statusFilter={statusFilter} />
      </div>
    </div>
  );
}
