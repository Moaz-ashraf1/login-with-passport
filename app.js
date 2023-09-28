const express = require("express");
require("dotenv").config({
  path: ".env",
});
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");
const profileRoutes = require("./routes/profileRoute");

const app = express();

//set up view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(process.env.DB_URI).then(() => {
  console.log(`connecting to database successfully`);
});
//set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

//create home route
app.get("/", (req, res, next) => {
  res.render("home", { user: req.user });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
