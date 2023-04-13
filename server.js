import express from "express";
import bodyParser from "body-parser";
const app = express();
import { admin_router, getWalk } from "./routes/admin.js";

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());

app.use("/admin", admin_router);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/private", (req, res) => {
  res.render("private");
});

app.get("/weekly", async (req, res) => {
  const result = await getWalk();
  res.render("weekly", { items: result.data });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/crud", async (req, res) => {
  const result = await getWalk();
  res.render("crud", { items: result.data });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
