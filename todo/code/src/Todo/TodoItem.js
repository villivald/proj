import React, { useContext } from "react";
import Context from "../context";

const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid black",
    borderRadius: "4px",
    marginBottom: ".5rem",
    boxShadow: "4px 4px grey",
  },
  input: {
    marginRight: "1rem",
  },
};

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);

  const classesLi = [];
  const classesSpan = [];
  if (todo.completed) {
    classesLi.push("doneLi");
    classesSpan.push("doneSpan");
  }
  return (
    <li className={classesLi.join(" ")} style={styles.li}>
      <span className={classesSpan.join(" ")}>
        <input
          title="Mark task as done"
          style={styles.input}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onChange(todo.id)}
        />
        &nbsp;
        {todo.title}
      </span>

      <button
        title="Delete task"
        className="rm"
        onClick={() => removeTodo(todo.id)}
      >
        &times;
      </button>
      {/*<EditTodo />*/}
    </li>
  );
}

export default TodoItem;
