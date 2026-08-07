"use client";

import { useState } from "react";
import { TodoList } from "./components/TodoList";
import { useAppDispatch } from "./store/hooks";
import { addTodo } from "./store/todosSlice";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

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

  return (
    <div className="flex w-full flex-1 justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            handleAddTodo();
          }}
        >
          <input
            className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            type="text"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            Add Todo
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
          <label className="flex flex-1 items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="shrink-0">Search</span>
            <input
              className="w-full flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              type="text"
              placeholder="Search todos..."
              value={inputSearch}
              onChange={handleSearchChange}
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="shrink-0">Status</span>
            <select
              className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              onChange={handleChangeStatusFilter}
              value={statusFilter}
            >
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="not-done">Not Done</option>
            </select>
          </label>
        </div>

        <div className="mt-4 overflow-hidden rounded border border-gray-200 dark:border-gray-800">
          <TodoList searchTerm={debouncedSearch} statusFilter={statusFilter} />
        </div>
      </div>
    </div>
  );
}
