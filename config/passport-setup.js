const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

//saves a small piece of information about the user (like an ID) in the session.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//uses that information to find and attach the full user data to req.user when the user makes another request after login
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
  //Now, whenever you want to know which user is currently logged in, you can just check req.user in your route handlers, and it will contain all the details of the logged-in user.
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ google_id: profile.id });

        if (existingUser) {
          // User already exists, return the existing user
          done(null, existingUser);
        } else {
          // Create a new user
          const newUser = await User.create({
            username: profile.displayName,
            google_id: profile.id,
            thumbnail: profile._json.picture,
          });

          done(null, newUser);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
