import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* acesso a dados de api  
 useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=20",
        { method: "GET" }
      );

      const data = await response.json();
      setTasks(data);
    };

    //fetchTasks();
  }, []); */

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => taskId !== task.id);
    setTasks(newTasks);
  }

  function onAddTask(title, description) {
    const task = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, task]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Minhas Tarefas</Title>
        <AddTask onAddTask={onAddTask} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
