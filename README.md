import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


import './App.css';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TodoList />
    </div>
  );
};

export default App;



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



.App {
  text-align: center;
  max-width: 400px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 32px 24px;
  font-family: 'Segoe UI', Arial, sans-serif;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

h1 {
  text-align: center;
  color: #2d3748;
  margin-bottom: 24px;
}

h2 {
  color: #4a5568;
  margin-bottom: 16px;
}

form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 16px;
}

button {
  background: #3182ce;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #2b6cb0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f7fafc;
  margin-bottom: 8px;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

li:hover {
  background: #e2e8f0;
}

li.completed {
  text-decoration: line-through;
  color: #a0aec0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* ...existing styles... */
}


import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;






const Employees = () => {
    return (
        <div>
            <h2>Employees</h2>
        </div>
    );
};

export default Employees;
