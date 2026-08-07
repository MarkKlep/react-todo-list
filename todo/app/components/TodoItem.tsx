import { CSSProperties, FC, memo } from "react";
import Link from "next/link";
import { TTodo } from "../types/todo";
import { toggleTodoStatus } from "../store/todosSlice";
import { deleteTodo } from "../store/todosSlice";
import { useAppDispatch } from "../store/hooks";

interface TodoItemProps {
    todo: TTodo;
    style?: CSSProperties;
}

export const TodoItem: FC<TodoItemProps> = memo(({ todo, style }) => {
    const dispatch = useAppDispatch();

    const handleChangeStatus = (id: string) => {
        dispatch(toggleTodoStatus(id));
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    };

    return (
        <li
            className="flex items-center gap-3 border-b border-gray-100 px-3 last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
            style={style}
        >
            <input
                className="h-4 w-4 shrink-0 cursor-pointer accent-blue-500"
                type='checkbox'
                checked={todo.isDone}
                onChange={() => handleChangeStatus(todo.id)}
            />
            <Link
                href={`/todos/${todo.id}`}
                className={`flex-1 truncate text-gray-800 hover:underline dark:text-gray-100 ${todo.isDone ? 'text-gray-400 line-through dark:text-gray-500' : ''}`}
            >
                {
                    todo.title
                }
            </Link>
            <button
                className="shrink-0 rounded px-2 py-1 text-sm font-medium text-red-500 hover:cursor-pointer hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950 dark:hover:text-red-400"
                onClick={() => handleDeleteTodo(todo.id)}
                aria-label={`Delete ${todo.title}`}
            >
                X
            </button>
        </li>
    )
});
