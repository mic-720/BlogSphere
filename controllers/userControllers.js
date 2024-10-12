const User = require("../models/userModel");

const renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

const signup = async (req, res) => {
  let { username, email, password } = req.body;
  const user = new User({ username, email });
  try {
    const registeredUser = await User.register(user, password);
    console.log(`User registered successfully : ${registeredUser.username}`);
    req.login(registeredUser, (err) => {
      if (err) {
        next(err);
      }
      res.status(200).redirect("/blogs");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.status(400).redirect("/signup");
  }
};

const renderSigninForm = (req, res) => {
  res.render("users/signin.ejs");
};

const signin = async (req, res) => {
  let { username, password } = req.body;
  let redirectUrl = res.locals.redirectUrl || "/blogs";
  req.flash("success", "Login successfull");
  res.redirect(redirectUrl);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are now logged out ");
    res.redirect("/blogs");
  });
};
module.exports = {
  signup,
  renderSignupForm,
  renderSigninForm,
  signin,
  logout,
};
