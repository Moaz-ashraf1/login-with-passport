const express = require("express");

const router = express.Router();

const authCheck = async (req, res, next) => {
  const user = await req.user;
  if (!user) {
    res.send("you must be logged in before access this page");
  } else {
    next();
  }
};
router.route("/").get(authCheck, (req, res, next) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
