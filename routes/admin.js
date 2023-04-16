import bodyParser from "body-parser";
import express from "express";
import { queryDatabase } from "../database.js";
import multer from "multer";
import path from "path";
import { unlink } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

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
    console.log(users);
  } catch (error) {
    console.log(error);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirPath = path.join(__dirname, "../public/");
    cb(null, dirPath + "assets/uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const uploadFilter = function (req, file, cb) {
  const typeArray = file.mimetype.split("/");
  const imageTypeMaybe = typeArray[1];
  if (imageTypeMaybe === "jpeg" || imageTypeMaybe === "png") {
    cb(null, true);
    console.log("sucesso");
  } else {
    console.log("erro");
    cb(new Error("it's not jpg or png"), false);
  }
};
//image type validation

const upload = multer({
  storage,
  fileFilter: uploadFilter,
}).single("file");

admin_router.post("/newWalk", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }

    // Everything went fine.

    // Create a unique filename for the uploaded image
    const filename = `${req.file.filename}`;

    // Store the path to the image in the database
    const result = await queryDatabase(
      "INSERT INTO walkPost (walk_title, description, image_url, walk_date) VALUES (?, ?, ?, ?)",
      [
        req.body.walk_title,
        req.body.description,
        `/assets/uploads/${filename}`, // store the path relative to the "public" directory
        req.body.walk_date,
      ]
    );

    res.json(result);
  });
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
