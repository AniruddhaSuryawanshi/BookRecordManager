const express = require("express");

const DbConnection = require("./databaseConnection");

const dotenv = require("dotenv");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up",
  });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(400).json({
    message: "does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`server at port ${PORT}`);
});
