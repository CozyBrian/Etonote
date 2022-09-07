import { useState, useEffect } from "react";

export default function useRightClickMenu() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (event: MouseEvent) => {
    showMenu && setShowMenu(false);
  };
  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    event.pageX + 128 > window.innerWidth
      ? setX(window.innerWidth - 130)
      : setX(event.pageX);
    event.pageY + 200 > window.innerHeight
      ? setY(window.innerHeight - 200)
      : setY(event.pageY);
    setShowMenu(true);
  };

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
