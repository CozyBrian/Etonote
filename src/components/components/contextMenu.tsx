import React from "react";
import { action } from "../../redux";
import { useAppDispatch } from "../../hooks";

type Props = {
  id?: string;
  x: number;
  y: number;
};

const ContextMenu = ({ id, x, y }: Props) => {
  const dispatch = useAppDispatch();

  const toggleDone = (id: string | undefined) => {
    return dispatch(action.todos.toggleDone(id));
  };
  const deleteTodo = (id: string | undefined) => {
    return dispatch(action.todos.deleteTodo(id));
  };

  const style = () => {
    return { top: y, left: x };
  };
  return (
    <div
      style={style()}
      className={`absolute flex flex-col w-48 p-0.5 bg-slate-100 z-50 rounded gap-1 shadow-md`}
    >
      <div
        onClick={() => console.log(id)}
        className="flex flex-row h-8 w-full bg-slate-200/80 hover:bg-slate-300/80 active:bg-slate-300 text-black pl-3 p-2 items-center rounded-sm"
      >
        Edit
      </div>
      <div
        onClick={() => toggleDone(id)}
        className="flex flex-row h-8 w-full bg-slate-200/80 hover:bg-slate-300/80 active:bg-slate-300 text-black pl-3 p-2 items-center rounded-sm"
      >
        Check
      </div>
      <div
        onClick={() => deleteTodo(id)}
        className="flex flex-row h-8 w-full bg-slate-200/80 hover:bg-slate-300/80 active:bg-slate-300 text-black pl-3 p-2 items-center rounded-sm"
      >
        Delete
      </div>
    </div>
  );
};

export default ContextMenu;
