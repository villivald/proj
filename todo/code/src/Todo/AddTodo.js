import React, { useState } from "react";

const styles = {
  input: {
    width: "480px",
    height: "20px",
    boxShadow: "4px 4px peru",
    outline: "none",
  },
  button: {
    width: "100px",
    height: "25px",
    boxShadow: "4px 4px peru",
    marginLeft: "10px",
  },
};

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  const input = useInputValue("");

  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }
  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      <input
        placeHolder="To visit Kivenlahti..."
        style={styles.input}
        {...input.bind}
      />
      <button style={styles.button} type="submit">
        Add task
      </button>
    </form>
  );
}

export default AddTodo;
