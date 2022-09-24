import React from "react";
import { action } from "../../redux";
import { useAppDispatch } from "../../hooks";

type PropsA = {
  id?: string;
  x: number;
  y: number;
  handleDelete: (arg0: boolean) => void;
};

type PropsB = {
  id?: string;
  x: number;
  y: number;
};

export const ListContextMenu = ({ id, x, y, handleDelete }: PropsA) => {
  const style = () => {
    return { top: y, left: x };
  };
  return (
    <div
      style={style()}
      className={`absolute flex flex-col w-48 p-1 bg-slate-100/80 backdrop-blur-sm z-50 rounded-xl gap-1 shadow-md`}
    >
      <div
        onClick={() => console.log(id)}
        className="flex flex-row h-8 w-full hover:bg-slate-200/70 active:bg-slate-300 text-black pl-3 p-2 items-center rounded-lg"
      >
        <div className="w-8">
          <div className="w-5 h-5 mr-2">
            <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
            </svg>
          </div>
        </div>
        Edit
      </div>
      <div
        onClick={() => handleDelete(true)}
        className="flex flex-row h-8 w-full hover:bg-slate-200/70 active:bg-slate-300 text-black pl-3 p-2 items-center rounded-lg"
      >
        <div className="w-8">
          <div className="w-[1.2rem] h-[1.2rem] mr-2">
            <svg
              id="Icons"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22,4H16V3a3,3,0,0,0-3-3H11A3,3,0,0,0,8,3V4H2A1,1,0,0,0,2,6H4V20a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2a1,1,0,0,0,0-2ZM10,3a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V4H10ZM9,18a1,1,0,0,1-2,0V10a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V10a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V10a1,1,0,0,1,2,0Z" />
            </svg>
          </div>
        </div>
        Delete
      </div>
    </div>
  );
};

export const TodoContextMenu = ({ id, x, y }: PropsB) => {
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
      className={`absolute flex flex-col w-48 p-1 bg-slate-100/80 backdrop-blur-sm z-50 rounded-xl gap-1 shadow-md`}
    >
      <div
        onClick={() => console.log(id)}
        className="flex flex-row h-8 w-full hover:bg-slate-200/70 active:bg-slate-300 text-black pl-3 p-2 items-center rounded-lg"
      >
        <div className="w-8">
          <div className="w-5 h-5 mr-2">
            <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
            </svg>
          </div>
        </div>
        Edit
      </div>
      <div
        onClick={() => toggleDone(id)}
        className="flex flex-row h-8 w-full hover:bg-slate-200/70 active:bg-slate-300 text-black pl-3 p-2 items-center rounded-lg"
      >
        <div className="w-8">
          <div className="w-4 h-4 mr-2">
            <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96C448 60.65 419.3 32 384 32zM400 416c0 8.836-7.164 16-16 16H64c-8.836 0-16-7.164-16-16V96c0-8.838 7.164-16 16-16h320c8.836 0 16 7.162 16 16V416zM303 175L192 286.1L144.1 239c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l64 64C179.7 341.7 185.8 344 192 344s12.28-2.344 16.97-7.031l128-128c9.375-9.375 9.375-24.56 0-33.94S312.4 165.7 303 175z" />
            </svg>
          </div>
        </div>
        Check
      </div>
      <div
        onClick={() => deleteTodo(id)}
        className="flex flex-row h-8 w-full hover:bg-slate-200/70 active:bg-slate-300 text-black pl-3 p-2 items-center rounded-lg"
      >
        <div className="w-8">
          <div className="w-[1.2rem] h-[1.2rem] mr-2">
            <svg
              id="Icons"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22,4H16V3a3,3,0,0,0-3-3H11A3,3,0,0,0,8,3V4H2A1,1,0,0,0,2,6H4V20a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2a1,1,0,0,0,0-2ZM10,3a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V4H10ZM9,18a1,1,0,0,1-2,0V10a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V10a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V10a1,1,0,0,1,2,0Z" />
            </svg>
          </div>
        </div>
        Delete
      </div>
    </div>
  );
};
