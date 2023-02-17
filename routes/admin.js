import express from "express";
import bodyParser from "body-parser";
import { connection } from "../database.js";

export const admin_router = express.Router();

admin_router.get("/admin", (req, res) => {
  res.render("../views/crud.ejs");
});

admin_router.get("/admin/users", async (req, res) => {
  try {
    const reqUser = await connection.query("select * from user");
    const users = reqUser[0];
    console.log(users);
  } catch (error) {
    console.log(error);
  }
});
