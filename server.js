import express from "express";
import User from "./models/user_model.js";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import { admin_router, getWalk } from "./routes/admin.js";
const app = express();

export const ensureAuthenticated = (req, res, next) => {
  if (!req.user) return res.redirect("/");
  next();
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("i am here:");
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
  console.log("serialized", user);
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  try {
    console.log("deserialized", user);
    done(null, user);
  } catch (err) {
    console.error(err);
    done(err);
  }
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());

app.use(
  session({ secret: "hello world!", resave: false, saveUninitialized: false })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/admin", ensureAuthenticated, admin_router);

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

app.get("/crud", ensureAuthenticated, async (req, res) => {
  const result = await getWalk();
  res.render("crud", { items: result.data });
});

app.post(
  "/doLogin",
  passport.authenticate("local", {
    successRedirect: "/crud",
    failureRedirect: "/",
  })(req, res)
);

app.get("/doLogout", async (req, res) => {
  req.logout((error) => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
