require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");

const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

const User = require("./models/userModel");

const path = require("path");
var ejsMate = require("ejs-mate");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(expressLayouts);
app.set("layout", "layouts/boilerplate");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});



app.get("/", (req, res) => {
  res.redirect("/blogs")
});

app.get("/home",(req,res)=>{
  res.render("blogs/home.ejs")
})

app.use("/blogs", blogRoutes);
app.use("/blogs/:blogId/comments", commentRoutes);
app.use("/auth", userRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Connected to DB and running on port http://localhost:${process.env.PORT}/`
    );
  });
});
