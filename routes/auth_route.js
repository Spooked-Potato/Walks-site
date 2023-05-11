import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user_model.js";

import bodyParser from "body-parser";
const urlencodedParser = bodyParser.urlencoded({ extended: false });

export const ensureAuthenticated = (req, res, next) => {
  if (!req.user) return res.redirect("/crud");
  next();
};

const authRouter = express.Router();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("hello world!");
    try {
      const user = await User.find(username, password);
      if (!user) {
        return done(null, false, { message: "Invalid username or password" });
      } else {
        return done(null, user);
      }
    } catch (err) {
      console.error(err);
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  try {
    done(null, user);
  } catch (err) {
    console.error(err);
    done(err);
  }
});

authRouter.get("/", (req, res) => {
  res.render("login");
});

authRouter.post(
  "/doLogin",
  urlencodedParser,
  passport.authenticate("local", {
    successRedirect: "/crud",
    failureRedirect: "/",
  })
);

authRouter.get("/doLogout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

export default authRouter;
