import bodyParser from "body-parser";
import express from "express";
import { queryDatabase } from "../database.js";
import multer from "multer";
const path = require("path");

export const admin_router = express.Router();

export const getWalk = async () => {
  const results = await queryDatabase("select * from walkPost");
  console.log(results);
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

const upload = multer({
  dest: "public/assets/uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // limit the maximum file size to 10MB
  },
});

// admin_router.post("/newWalk", async (req, res) => {
//   const result = await queryDatabase(
//     "insert into walkPost (walk_title, description, image_url, walk_date) VALUES(?,?,?,?)",
//     [
//       req.body.walk_title,
//       req.body.description,
//       req.body.image_url,
//       req.body.walk_date,
//     ]
//   );
//   console.log(result);

//   res.json(result);
// });

admin_router.post("/newWalk", upload.single("image"), async (req, res) => {
  // Create a unique filename for the uploaded image
  const filename = `${Date.now()}-${req.file.originalname}`;

  // Move the uploaded image to the designated directory
  const uploadPath = path.join(
    __dirname,
    "public",
    "assets",
    "uploads",
    filename
  );
  await fs.promises.rename(req.file.path, uploadPath);

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
  console.log(filename);

  console.log(result);
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
  console.log(results);
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
  console.log(results);
  res.json(results);
});

admin_router.post("/walkDelete", async (req, res) => {
  const results = await queryDatabase("delete from walkPost where id=?", [
    req.body.id,
  ]);
  console.log(results);
  res.json(results);
});
