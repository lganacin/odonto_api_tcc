const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20");


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_API_KEY,
            clientSecret: process.env.GOOGLE_API_SECRET,
            callbackURL: "/auth/google/callback",
            scope: "user:email"
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);
