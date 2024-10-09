const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
})

router.post("/signup", async (req, res) => {
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
    res.status(400).redirect("/signup");
  }
});

module.exports = router;
