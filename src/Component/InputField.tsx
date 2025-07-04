import React, { useRef } from "react";
import "./style.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <form
        className="input"
        onSubmit={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        <input
          type="input"
          ref={inputRef}
          value={todo}
          placeholder="Enter a task"
          className="input_box"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="input_submit">
            GO
        </button>
      </form>
    </div>
  );
};

export default InputField;
