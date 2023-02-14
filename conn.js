const express = require("express");
const app = express();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "walks.slq",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.listen(3000, () => {
  console.log("Express app listening on port 3000");
});
