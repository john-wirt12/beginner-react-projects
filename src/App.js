import './App.css';
import TodoList from './components/todolist/TodoList'; // importing child component

// parent component where child component is rendered
function App() {
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
