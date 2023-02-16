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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
