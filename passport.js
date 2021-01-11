import passport from "passport";
import GithubStrategy from "passport-github";
import {
  githubLoginCallback,
  naverLoginCallback,
} from "./Controllers/userController";
import User from "./models/User";
import routes from "./routes";
import NaverStrategy from "passport-naver";
import dotenv from "dotenv";
dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NA_ID,
      clientSecret: process.env.NA_SECRET,
      callbackURL: `http://localhost:4000${routes.naverCallback}`,
    },
    naverLoginCallback
  )
);
