import React from 'react';
import './styles/App.css';
import TodoList from "./TodoList";

function App() {
  return (
    <div className="App">
        <header>
            <h1>To-do<span>App</span></h1>
            <h3>Simple yet awesome to-do list app</h3>
        </header>
        <TodoList ></TodoList>
    </div>
  );
}

export default App;
