import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/private", (req, res) => {
  res.render("private");
});

app.get("/weekly", (req, res) => {
  res.render("weekly");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/crud", (req, res) => {
  res.render("crud");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
