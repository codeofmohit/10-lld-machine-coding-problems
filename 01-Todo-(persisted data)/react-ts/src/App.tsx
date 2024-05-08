import { useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { loadFromLs } from "./utils/localStorageHelper";

function App() {
  // setting up ls
  useEffect(() => {
    loadFromLs();
  }, []);

  return <Todo />;
}

export default App;
