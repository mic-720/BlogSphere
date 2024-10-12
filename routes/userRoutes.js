const passport = require("passport");
const express = require("express");
const router = express.Router();
const { savedRedirectUrl } = require("../middleware.js");

const {
  signup,
  renderSignupForm,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/userControllers");

router.get("/signup", renderSignupForm);

router.post("/signup",signup);

router.get("/signin", renderSigninForm);

router.post(
  "/signin",
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/auth/signin",
    failureFlash: true,
  }),
  signin
);

router.get("/logout",logout)

module.exports = router;
