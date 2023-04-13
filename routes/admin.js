import express from "express";
import bodyParser from "body-parser";
import { queryDatabase } from "../database.js";

export const admin_router = express.Router();

export const getWalk = async () => {
  const results = await queryDatabase("select * from walkPost");
  return results;
};

admin_router.get("/admin", (req, res) => {
  res.render("../views/crud.ejs");
  res.render("../views/weekly.ejs");
});

admin_router.get("/admin/users", async (req, res) => {
  try {
    const reqUser = await queryDatabase("select * from user");
    const users = reqUser[0];
  } catch (error) {
    console.log(error);
  }
});

admin_router.post("/newWalk", async (req, res) => {
  const result = await queryDatabase(
    "insert into walkPost (walk_title, description, image_url, walk_date) VALUES(?,?,?,?)",
    [
      req.body.walk_title,
      req.body.description,
      req.body.image_url,
      req.body.walk_date,
    ]
  );

  res.json(result);
});

admin_router.get("/walkPosts", async (req, res) => {
  const result = await getWalk();
  return res.json(result);
});

admin_router.get("/walkPosts/:id", async (req, res) => {
  const results = await queryDatabase("select * from walkPost where id=?", [
    req.params.id,
  ]);

  res.json(results);
});

admin_router.post("/updatePost", async (req, res) => {
  const results = await queryDatabase(
    "update walkPost set walk_title=?, description=?, image_url=?, walk_date=? where id=?",
    [
      req.body.walk_title,
      req.body.description,
      req.body.image_url,
      req.body.walk_date,
      req.body.id,
    ]
  );

  res.json(results);
});

admin_router.post("/walkDelete", async (req, res) => {
  const results = await queryDatabase("delete from walkPost where id=?", [
    req.body.id,
  ]);

  res.json(results);
});
