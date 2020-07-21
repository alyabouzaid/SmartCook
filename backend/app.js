require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const cookieSession = require("cookie-session");

const cors = require("cors");
const bodyParser = require("body-parser");
const formData = require("express-form-data");


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const journalsRouter = require('./routes/journals');
const imagesRouter = require('./routes/images');
const inventoryRouter = require('./routes/inventory');
const  recipesRouter = require('./routes/recipes');
const foodPicturesRouter = require("./routes/foodPictures");

// configuration constants. Make sure it matches what you registered.
const clientID = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const scope = ["email", "profile"];
const oauthPath = "/auth/google";
const callbackPath = "/auth/google/callback";
const callbackURL = "http://localhost:9000/auth/google/callback";

let isAuthenticated = false;
let name = "";
let email = "";
let fullName = "";

// mongoose
const mongoose = require("mongoose");

const app = express();

// mongoose connection
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
// mongoose
//   .connect("mongodb://localhost/ReactReduxExpressMongo")
//   .then(() => console.log("connection successful"))
//   .catch((err) => console.error(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(formData.parse());
app.use(bodyParser.json());

// TODO: uncomment before deploy
// app.use(express.static(path.join(__dirname, '/frontend/build')));

// To use cookie session
app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
      keys: [process.env.COOKIE_KEY], // use to sign & verify cookie values
    })
);
app.use(passport.initialize());
app.use(passport.session());

// OAuth Strategy to get access_token
passport.use(
    new GoogleStrategy(
        { clientID, clientSecret, callbackURL },
        (accessToken, refreshToken, profile, done) => {
          // console.log(accessToken);
          console.log(profile);
          // Where you verify user on your application
          // Find or Create a user in your DB and pass it.
          // If you are not using googleapis, you don't need to keep access token anymore.
          // access token is already used to fetch profile info.
          fullName = profile.displayName;
          name = profile.name.givenName;
          email = profile.emails[0].value;
          done(null, { accessToken, refreshToken, profile });
        }
    )
);

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// all routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
// google authentication routes
// app.use("/auth", serverRouter);
app.use('/inventories', inventoryRouter);
// journal feature routes
app.use("/journals", journalsRouter);
app.use("/images", imagesRouter);
// food pictures feature routes
app.use("/foodPictures", foodPicturesRouter);
app.use("/recipes", recipesRouter);

app.get("/auth/user", (req, res) => {
  let json = {
    isLoggedIn: isAuthenticated,
    firstName: name,
    email: email,
    fullName: fullName,
  };
  console.log(json);
  res.send(json);
});

// Start oauth flow
app.get(oauthPath, passport.authenticate("google", { scope }));

// Path receiving Auth Code
// This callback path must be registered to Auth Server
app.get(
    callbackPath,
    passport.authenticate("google"), // Will use Auth Code to get Access Token
    (req, res) => {
      // NOTE: if using jwt, you'd set the token here.
      // console.log("authenticated callback");
      // console.log(req.user);
      isAuthenticated = true;
      res.redirect("http://localhost:3000"); // TODO: CHANGE TO "/"
    }
);

app.get("/auth/logout", (req, res) => {
  req.logout();
  req.session = null;
  isAuthenticated = false;
  name = "";
  email = "";
  fullName = "";
  if (req.user) {
    console.log("user still authenticated");
  } else {
    console.log("user not authenticated");
  }
  res.redirect("http://localhost:3000"); // TODO: CHANGE TO "/"
});

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  // NOTE: if using jwt, you'd verify the token here.

  if (req.user) {
    next();
  } else {
    res.send("You must log in!");
  }
}

// TODO: uncomment before deploy
// app.get("/*", isUserAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
// });

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
