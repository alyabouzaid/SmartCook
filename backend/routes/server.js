const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const cookieSession = require("cookie-session");

// configuration constants. Make sure it matches what you registered.
const clientID = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const scope = ["email", "profile"];
const url = "http://localhost:9000";
const oauthPath = "/auth/google";
const callbackPath = "/auth/google/callback";
const callbackURL = `${url}${callbackPath}`;

let isAuthenticated = false;
let name = '';
let email = '';

let app = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// To use cookie session
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
        keys: [ process.env.COOKIE_KEY ] // use to sign & verify cookie values
    })
);
app.use(passport.initialize());
app.use(passport.session());

// OAuth Strategy to get access_token
passport.use(new GoogleStrategy(
    { clientID, clientSecret, callbackURL },
    (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        console.log(profile);

        // Where you verify user on your application
        // Find or Create a user in your DB and pass it.
        // If you are not using googleapis, you don't need to keep access token anymore.
        // access token is already used to fetch profile info.
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

// Start oauth flow
app.get(
    oauthPath,
    passport.authenticate("google", { scope })
);

// Path receiving Auth Code
// This callback path must be registered to Auth Server
app.get(
    callbackPath,
    passport.authenticate("google"),  // Will use Auth Code to get Access Token
    (req, res) => {
        // NOTE: if using jwt, you'd set the token here.
        // console.log("authenticated callback");
        // console.log(req.user);
        isAuthenticated = true;
        res.redirect("http://localhost:3000");
    }
);

// Middleware to check if the user is authenticated
// function isUserAuthenticated(req, res, next) {
//     // NOTE: if using jwt, you'd verify the token here.
//
//     if (req.user) {
//         isAuthenticated = true;
//         // console.log(`authenticated ${req.user.profile.id}`);
//         console.log('user authenticated');
//         next();
//     } else {
//         console.log('user not authenticated');
//         isAuthenticated = false;
//         name = '';
//         email = '';
//         // Path to start auth flow
//         res.redirect(oauthPath);
//     }
// }

app.get('/auth/user', (req, res) => {
    let json =
        {
            isLoggedIn: isAuthenticated,
            firstName: name,
            email: email,
        }
    ;
    console.log(json);
    res.send(json);
});

app.get('/auth/logout', (req, res) => {
    req.logout();
    req.session = null;
    isAuthenticated = false;
    name = '';
    email = '';
    if (req.user) {
        console.log('user still authenticated');
    } else {
        console.log('user not authenticated');
    }
    res.redirect("http://localhost:3000/");
});

// error handler
// app.use(function(err, req, res, next) {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};
//     res.status(err.status || 500);
//     res.render("error");
// });

module.exports = app;