import { useState, useRef } from "react";
import { action } from "../../redux";
import { useAppDispatch } from "../../hooks";

const AddTodoInput = () => {
  const textBox = useRef(null);
  const [todoTitle, setTodoTitle] = useState("");

  const dispatch = useAppDispatch();

  const addTodoItem = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    console.log(todoTitle);
    setTodoTitle("");
    dispatch(
      action.todos.addTodo({
        title: todoTitle,
        icon: "👨🏾‍💻",
        isDone: false,
      })
    );
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <form onSubmit={addTodoItem}>
      <input
        className="border-none w-full outline-none text-white bg-slate-300 focus:bg-gray-400 focus:placeholder:text-gray-300 p-4 rounded-2xl duration-150"
        placeholder="Write a new task"
        accept="text"
        ref={textBox}
        value={todoTitle}
        onChange={(value) => setTodoTitle(value.target.value)}
      />
    </form>
  );
};

export default AddTodoInput;
