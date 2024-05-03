import { useState } from "react";
import { TaskElem, Task } from "./TaskElem";

function TaskContainer() {
  // Default tasks to fill data
  const defaultTasks: Task[] = [
    { completed: true, text: 'Apply for Honors IT position' },
    { completed: true, text: 'Submit Project' },
    { completed: false, text: 'Get an offer' }
  ];

  // States
  const [tasks, setTasks] = useState(defaultTasks);
  const [inputText, setInputText] = useState('');

  const addTask = () => {
    // Check if empty or white spaces
    if (inputText.trim() === '') {
      window.alert('Task cannot be empty');
      return;
    }

    // Check if there's already a task with the same text
    if (tasks.some(task => task.text.toLowerCase() === inputText.toLowerCase())) {
      window.alert('Task already exists');
      return;
    }

    // If all ok, create an instance of Task
    const newTask: Task = { completed: false, text: inputText };
    // Update tasks
    setTasks([...tasks, newTask]);

    // Reset input text
    setInputText('');
  };

  const removeTask = (taskToRemove: Task) => {
    setTasks(tasks.filter(task => task !== taskToRemove));
  };

  const toggleTask = (taskToToggle: Task) => {
    // For each task
    const updatedTasks = tasks.map(task => {
      // If this is the one we want to toggle
      if (task === taskToToggle) {
        // Inverse bool value of completed
        task.completed = !task.completed;
      }
      return task;
    });

    // Update state
    setTasks(updatedTasks);
  };

  return <div>
    {/* Bind input value to inputText, add change handler */}
    <div className="taskInputWrapper">
      <input
        className="taskInput"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        placeholder="New task"
      />
      <button className="addButton" onClick={addTask}>+</button>
    </div>

    {/* For each task, render TaskElem with corresponding props */}
    {tasks.map((task, index) => (
      <TaskElem
        key={index}
        task={task}
        onRemove={() => removeTask(task)}
        onToggle={() => toggleTask(task)}
      />
    ))}
    {tasks.length === 0 &&
      <h2>No tasks yet.</h2>
    }
  </div>
}

export default TaskContainer;