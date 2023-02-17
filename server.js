import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
const app = express();
import { connection } from "./database.js";
import { admin_router } from "./routes/admin.js";

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", admin_router);

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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
