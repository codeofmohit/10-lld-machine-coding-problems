import { useEffect } from "react";
import "./App.css";
import TodoApp from "./components/TodoApp";
import { loadFromLs } from "./utils/localStorageHelper";

function App() {
  // setting up ls
  useEffect(() => {
    loadFromLs();
  }, []);

  return <TodoApp />;
}

export default App;
