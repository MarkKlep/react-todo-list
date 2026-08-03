import { FC } from "react";
import { TTodo } from "../types/todo";

interface TodoItemProps {
    todo: TTodo;
    handleChangeStatus: (id: string) => void;
    handleDeleteTodo: (id: string) => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, handleChangeStatus, handleDeleteTodo }) => {
    return (
        <li className="flex items-center space-x-2" key={todo.id}>
            <input
                type='checkbox'
                checked={todo.isDone}
                onChange={() => handleChangeStatus(todo.id)}
            />
            <span className={todo.isDone ? 'line-through' : ''}>
                {
                    todo.title
                }
            </span>
            <button
                className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                onClick={() => handleDeleteTodo(todo.id)}
            >
                X
            </button>
        </li>
    )
}
