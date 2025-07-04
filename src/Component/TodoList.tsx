import React from 'react';
import type { Todo } from '../modal/modal';
import './style.css';
import SingleTodo from './SingleTodo';

interface Props {
  allTodo: Todo[];
  setAllTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ allTodo, setAllTodo }) => {
  return (
    <div className='todos'>
      <ul>
        {allTodo?.map((t) => (
          <SingleTodo 
            allTodo={allTodo}
            todo={t}
            key={t.id}
            setAllTodo={setAllTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
