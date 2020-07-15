import React, { useState, useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import useLocalStorageState from "use-local-storage-state";

const AddTodo = React.lazy(() => import("./Todo/AddTodo"));

const Wrap = () => {
  const [todos, setTodos] = useLocalStorageState("todos", []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (title) => {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  };
  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>To Do App</h1>

        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p> All done. Add some new tasks. </p>
        )}
      </div>
    </Context.Provider>
  );
};

export default Wrap;
