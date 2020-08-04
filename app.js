require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const bodyParser = require("body-parser");
const formData = require("express-form-data");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const journalsRouter = require("./routes/journals");
const imagesRouter = require("./routes/images");
const inventoryRouter = require("./routes/inventory");
const recipesRouter = require("./routes/recipes");
const foodPicturesRouter = require("./routes/foodPictures");
const userProfilePicRouter = require("./routes/userProfilePic");

const clientID = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const scope = ["email", "profile"];
const oauthPath = "/auth/google";
const callbackPath = "/auth/google/callback";
const callbackURL = "/auth/google/callback";

const mongoose = require("mongoose");

const app = express();

const uri = process.env.ATLAS_URL;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("client/build"));
app.use(formData.parse());
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const users = require("./models/users.model");

// Source from: http://www.passportjs.org/docs/google/
passport.use(
  new GoogleStrategy(
    { clientID, clientSecret, callbackURL },
    (accessToken, refreshToken, profile, done) => {
      users.findOrCreate(
        { email: profile.emails[0].value },
        {
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          fullName: profile.displayName,
          googleDefaultPic: profile.photos[0].value,
        },
        function (err, user) {
          user.picture = profile._json.picture;
          user.save();
          return done(err, user);
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/inventories", inventoryRouter);
app.use("/journals", journalsRouter);
app.use("/images", imagesRouter);
app.use("/foodPictures", foodPicturesRouter);
app.use("/recipes", recipesRouter);
app.use("/userProfilePic", userProfilePicRouter);

app.get("/auth/user", isUserAuthenticated, (req, res) => {
  users.findOne({ email: req.user.email }, function (err, result) {
    res.send(result);
  });
});

// Source from: http://www.passportjs.org/docs/google/
app.get(oauthPath, passport.authenticate("google", { scope }));

// Source from: http://www.passportjs.org/docs/google/
app.get(
  callbackPath,
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/auth/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.redirect("/");
});

function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send("You must log in!");
  }
}

app.get("/*", isUserAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
