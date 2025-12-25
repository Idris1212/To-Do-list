import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { text, completed: false }]);
  };

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  const deleteAll = () => {
  setTodos([]);
};

  return (
    <div>
      <h2>List here</h2>
      <TodoForm addTodo={addTodo} />
      <button onClick={deleteAll} style={{ marginBottom: '16px', background: '#e53e3e', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}>Delete All</button>
      <ul>
        {todos.map((todo, idx) => (
          <li
            key={idx}
            onClick={() => toggleTodo(idx)}
            style={{ cursor: 'pointer' }}
          >
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={(e) => { e.stopPropagation(); deleteTodo(idx); }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
