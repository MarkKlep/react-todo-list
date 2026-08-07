import { FC, UIEvent, useMemo, useState } from "react";
import { TodoItem } from "./TodoItem";
import { useAppSelector } from "../store/hooks";

const ROW_HEIGHT = 40;
const CONTAINER_HEIGHT = 500;
const OVERSCAN = 80;

export const TodoList: FC<{ searchTerm: string; statusFilter: 'all' | 'done' | 'not-done' }> = ({ searchTerm, statusFilter }) => {
    const allTodos = useAppSelector((state) => Object.values(state.todos));
    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        setScrollTop(event.currentTarget.scrollTop);
    };

    const term = searchTerm.trim().toLowerCase();
    const todos = useMemo(() => {
        return (term === ""
            ? allTodos
            : allTodos.filter(todo => todo.title.toLowerCase().includes(term)))
            .filter(todo => {
                if (statusFilter === 'all') return true;
                if (statusFilter === 'done') return todo.isDone;
                if (statusFilter === 'not-done') return !todo.isDone;
                return false;
            });
    }, [allTodos, term, statusFilter]);

    const startIndex = Math.max(
        0,
        Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN
    );
    const endIndex = Math.min(
        todos.length,
        Math.ceil((scrollTop + CONTAINER_HEIGHT) / ROW_HEIGHT) + OVERSCAN
    );
    const visibleTodos = todos.slice(startIndex, endIndex);

    return (
        <>
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                <span>{todos.length} todos</span>
            </div>
            <div
                onScroll={handleScroll}
                style={{ height: CONTAINER_HEIGHT, overflowY: "auto" }}
                className="bg-white dark:bg-gray-950"
            >
                <ul style={{ height: todos.length * ROW_HEIGHT, position: "relative" }}>
                    {visibleTodos.map((todo, i) => {
                        const index = startIndex + i;
                        return (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                style={{
                                    position: "absolute",
                                    top: index * ROW_HEIGHT,
                                    left: 0,
                                    right: 0,
                                    height: ROW_HEIGHT,
                                }}
                            />
                        );
                    })}
                </ul>
            </div>
        </>
    );
};
