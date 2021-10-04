const express = require("express");
const app = express();
const cors = require("cors");

// * DATA BASE CONNECTION

// TODO: Paste this code in db.js

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "alihaider104",
  host: "localhost",
  database: "todo",
  port: 5432,
});

// * Middleware
app.use(cors());
app.use(express.json());

// * ROUTES

// * Get All Todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT* FROM todoly");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// * Create a Todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todoly (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.send("Todo Was Added!");
  } catch (err) {
    console.error(err.message);
  }
});

// * Get a Todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT* FROM todoly WHERE todo_id=$1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// * Update a Todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todoly SET description=$1 WHERE todo_id = $2",
      [description, id]
    );
    res.send("Todo Was Updated!");
  } catch (error) {
    console.error(error.message);
  }
});

// * Delete a Todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const deleteTodo = await pool.query("DELETE FROM todoly WHERE todo_id=$1", [
    id,
  ]);
  res.send("Todo Deleted!");
});

app.use(express.json()); // * allow us to access req-body

app.listen(5000, () => {
  console.log("Server is starting at port 5000");
});
