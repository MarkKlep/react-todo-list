import { FC } from "react";
import { TodoItem } from "./TodoItem";
import { TTodo } from "../types/todo";

interface TodoListProps {
    todos: TTodo[];
    handleChangeStatus: (id: string) => void;
    handleDeleteTodo: (id: string) => void;
}

export const TodoList: FC<TodoListProps> = ({ todos, handleChangeStatus, handleDeleteTodo }) => {
    return (
        <ul>
            {
                todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteTodo={handleDeleteTodo}
                    />
                ))
            }
        </ul>
    )
}
