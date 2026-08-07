"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { TTodo } from "../../types/todo";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteTodo, toggleTodoStatus, updateTodoTitle } from "../../store/todosSlice";

export default function TodoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const todo = useAppSelector((state) => state.todos[id]);

  if (!todo) {
    return (
      <div className="flex w-full flex-1 justify-center px-4 py-10">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Todo not found</h1>
          <p className="mt-2 text-gray-600">It may have been deleted, or the link is invalid.</p>
          <Link href="/" className="mt-6 inline-block text-blue-500 hover:underline">
            ← Back to list
          </Link>
        </div>
      </div>
    );
  }

  return <TodoDetail key={todo.id} todo={todo} />;
}

function TodoDetail({ todo }: { todo: TTodo }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(todo.title);

  const handleSaveTitle = () => {
    const trimmed = title.trim();
    if (trimmed === "" || trimmed === todo.title) return;
    dispatch(updateTodoTitle({ id: todo.id, title: trimmed }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    router.push("/");
  };

  return (
    <div className="flex w-full flex-1 justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="text-sm text-blue-500 hover:underline">
          ← Back to list
        </Link>

        <h1 className="mt-4 text-2xl font-semibold text-gray-900">Todo details</h1>

        <form
          className="mt-6 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            handleSaveTitle();
          }}
        >
          <input
            className="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            Save
          </button>
        </form>

        <label className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <input
            className="h-4 w-4 cursor-pointer accent-blue-500"
            type="checkbox"
            checked={todo.isDone}
            onChange={() => dispatch(toggleTodoStatus(todo.id))}
          />
          Done
        </label>

        <button
          className="mt-6 rounded px-3 py-2 text-sm font-medium text-red-500 hover:cursor-pointer hover:bg-red-50 hover:text-red-700"
          onClick={handleDelete}
        >
          Delete todo
        </button>
      </div>
    </div>
  );
}
