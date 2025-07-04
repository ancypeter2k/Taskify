import React, { useState } from "react";
import InputField from "./Component/InputField"; // Input component
import TodoList from "./Component/TodoList";     // List component
import "./App.css";                              // CSS styles
import type { Todo } from "./modal/modal.ts";    // Import Todo type from modal (or models.ts)

// Main App component
const App = () => {
  // State to store current input value
  const [todo, setTodo] = useState<string | number>("");

  // State to store all todo items
  const [allTodo, setAllTodo] = useState<Todo[]>([]);

  // Function to handle form submit
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit

    if (todo) {
      // Create a new todo item and update the list
      const newTodo: Todo = {
        id: Date.now(),       // Unique ID using timestamp
        todo: todo,           // Task text
        isDone: false,        // Mark as not done
      };

      setAllTodo([...allTodo, newTodo]); // Append to todo list
      setTodo(""); // Clear input field after adding
    }
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>

      {/* Input Field Component */}
      <InputField
        todo={todo}
        setTodo={setTodo}
        handleAdd={handleAdd}
      />

      {/* Todo List Component */}
      <TodoList
        allTodo={allTodo}
        setAllTodo={setAllTodo}
      />
    </div>
  );
};

export default App;
