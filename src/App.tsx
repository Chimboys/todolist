import ContactCard from './components/ContactCard';
import TaskContainer from './components/TaskContainer';
import "./style.css";

function App() {
  return (
    <div className="App">
      <h1>Akmal's To-Do List</h1>
      <h2>Here is what you need to do</h2>
      <TaskContainer />
      <h1>Task 2: API Calls</h1>
      <ContactCard />
    </div>

  );
}

export default App;