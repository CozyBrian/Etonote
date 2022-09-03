import AddTodoInput from "../components/add-todo-bar.component";
import Header from "../components/header";
import TaskList from "./task-list.component";

const TasksView = () => {
  return (
    <div className="flex container justify-center p-12 pb-0">
      <div className="min-w-[48rem]">
        <Header />
        <AddTodoInput />
        <TaskList />
      </div>
    </div>
  );
};

export default TasksView;
