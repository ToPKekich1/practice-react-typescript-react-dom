import React, { useState, useEffect } from 'react';
import { ITodo } from '../interfaces';
import TodoForm from '../components/TodoForm';
import { TodoList } from '../components/TodoList';

declare var confirm: (question: string) => boolean;

export const TodosPage: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        const saved = JSON.parse(
            localStorage.getItem('todos') || '[]'
        ) as ITodo[];
        setTodos(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addHandler = (title: string) => {
        const newTodo = {
            title,
            id: Date.now(),
            completed: false
        };
        // setTodos([newTodo, ...todos]);
        setTodos(prev => [newTodo, ...prev]);
    };

    const toggleHandler = (id: number) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                    return todo;
                }
                return todo;
            })
        );
    };

    const removeHandler = (id: number) => {
        const shouldRemove = confirm('Вы уверены, что хотите удалить элемент?');
        if (shouldRemove) {
            setTodos(prev => prev.filter(todo => todo.id !== id));
        }
    };

    return (
        <>
            <TodoForm onAdd={addHandler} />

            <TodoList
                onToggle={toggleHandler}
                onRemove={removeHandler}
                todos={todos}
            />
        </>
    );
};
