import { useState, useEffect } from "react";
import useEventListener from "./useEventListener";

export default function useRightClickMenu(
  taskRef: React.MutableRefObject<null>
) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const handleClick = (event: MouseEvent) => {
    setIsOver(false);
    showMenu && setShowMenu(false);
  };
  const handleMouseOver = (event: MouseEvent) => {
    setIsOver(true);
  };
  const handleMouseOut = (event: MouseEvent) => {
    setIsOver(false);
  };

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    if (isOver) {
      event.pageX + 128 > window.innerWidth
        ? setX(window.innerWidth - 130)
        : setX(event.pageX);
      event.pageY + 200 > window.innerHeight
        ? setY(window.innerHeight - 200)
        : setY(event.pageY);
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  useEventListener("mouseover", handleMouseOver, taskRef);
  useEventListener("mouseout", handleMouseOut, taskRef);
  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { x, y, showMenu };
}
