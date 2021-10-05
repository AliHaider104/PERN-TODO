import React, { Fragment, useEffect, useState } from "react";

//* Componenet
import EditTodo from "./EditTodo";
import styled, { ThemeProvider } from "styled-components";
import { LightTheme, DarkTheme, GlobalStyle } from "./theme.js";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  //* Delete Todo Function

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <ThemeProvider theme={theme === "light" ? DarkTheme : LightTheme}>
      <GlobalStyle />
      <StyledApp>
        <Fragment>
          <table className="table mt-5 text-center">
            <thead>
              <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.todo_id}>
                  <td>{todo.description}</td>
                  <td>
                    <EditTodo todo={todo} />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteTodo(todo.todo_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
        <button
          className="btn btn-outline-primary"
          onClick={() => themeToggler()}
        >
          Change Theme
        </button>
      </StyledApp>
    </ThemeProvider>
  );
};

export default ListTodo;
