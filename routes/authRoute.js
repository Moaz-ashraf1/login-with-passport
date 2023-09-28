const express = require("express");
const passport = require("passport");

const router = express.Router();

//login
router.route("/login").get((req, res, next) => {
  res.render("login", { user: req.user });
});

// logout
router.route("/logout").get((req, res, next) => {
  req.logout();
  res.redirect("/");
});

// auth with google
router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback ()
router
  .route("/google/redirect")
  .get(passport.authenticate("google"), (req, res, next) => {
    res.redirect("/profile/");
  });

module.exports = router;
