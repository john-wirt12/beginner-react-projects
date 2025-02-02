import React from 'react';
import './App.css';
import TodoList from './components/todolist/TodoList'; // importing child component
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from './root';
import Increment from './components/incrementer/Incrementer';
import Calculator from './components/calculator/Calculator';
import RandomMessage from './components/quote_generator/RandomMessage';
import Weather from './components/weather/Weather';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={  <Root /> }>
      <Route path="todolist" element={ <TodoList /> } />
      <Route path="increment" element={ <Increment /> } />
      <Route path="calculator" element={ <Calculator /> } />
      <Route path="randomMessage" element={ <RandomMessage />} />
      <Route path="weather" element={ <Weather /> } />
    </Route>
))

// parent component where child component is rendered
function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
