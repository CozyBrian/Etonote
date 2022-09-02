import React from "react";
import TaskItem from "../components/tasks-item.component";

const TaskList = () => {
  const lists = [
    {
      title: "Play Full-Metal Alchemist",
      icon: "🎮",
      isDone: false,
    },
    {
      title: "Make a todo list app",
      icon: "👨🏾‍💻",
      isDone: false,
    },
    {
      title: "Study Numerical Algerbra",
      icon: "📚",
      isDone: true,
    },
    {
      title: "Buy Playstation 4 and get some games",
      icon: "🎮",
      isDone: false,
    },
  ];

  return (
    <div className="h-full mt-4 pb-32">
      <div className="h-full pb-32 overflow-scroll ">
        {lists.map((item, i) => (
          <TaskItem title={item.title} icon={item.icon} isDone={item.isDone} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
