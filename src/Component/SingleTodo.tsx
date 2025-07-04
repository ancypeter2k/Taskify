import React, { useState, useRef, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Todo } from "../modal/modal";
import "./style.css";

// Define prop types for better readability and reusability
interface SingleTodoProps {
  todo: Todo;
  allTodo: Todo[];
  setAllTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<SingleTodoProps> = ({ todo, allTodo, setAllTodo }) => {
  const [edit, setEdit] = useState<boolean>(false);          
  const [editTodo, setEditTodo] = useState<string>(todo.todo); 

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input field when entering edit mode
  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  // 🔧 Fix: Reset `editTodo` every time `edit` is toggled true
  useEffect(() => {
    if (edit) {
      setEditTodo(todo.todo); // ensure it's the latest todo text
    }
  }, [edit, todo.todo]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (!editTodo.trim()) return; // prevent empty submission
    setAllTodo(
      allTodo.map((t) => (t.id === id ? { ...t, todo: editTodo } : t))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setAllTodo(allTodo.filter((t) => t.id !== id));
  };

  const handleDone = (id: number) => {
    setAllTodo(
      allTodo.map((t) =>
        t.id === id ? { ...t, isDone: !t.isDone } : t
      )
    );
  };

  return (
    <form
      className="todos__single"
      onSubmit={(e) => handleEdit(e, todo.id)}
    >
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
          ref={inputRef}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div className="icons">
        {/* Edit Button */}
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(true); // triggers useEffect to load current todo
            }
          }}
        >
          <AiFillEdit />
        </span>

        {/* Delete Button */}
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>

        {/* Done Button */}
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
