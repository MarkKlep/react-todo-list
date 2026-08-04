import { TodoItem } from "./TodoItem";
import { useAppSelector } from "../store/hooks";

export const TodoList = () => {
    const todos = useAppSelector((state) => state.todos);

    return (
        <ul>
            {
                todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                    />
                ))
            }
        </ul>
    )
}
