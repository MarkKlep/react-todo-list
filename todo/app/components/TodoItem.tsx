import { CSSProperties, FC } from "react";
import { TTodo } from "../types/todo";
import { toggleTodoStatus } from "../store/todosSlice";
import { deleteTodo } from "../store/todosSlice";
import { useAppDispatch } from "../store/hooks";

interface TodoItemProps {
    todo: TTodo;
    style?: CSSProperties;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, style }) => {
    const dispatch = useAppDispatch();

    const handleChangeStatus = (id: string) => {
        dispatch(toggleTodoStatus(id));
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    };

    return (
        <li className="flex items-center space-x-2" style={style}>
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
