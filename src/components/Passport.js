const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userSchema = require("../schema/userSchema");
 
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await userSchema.findOne({ email: profile.emails[0].value });
                if (existingUser) {
                    return done(null, existingUser);
                }
                const newUser = new userSchema({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    ProfilePicture: profile.photos[0].value,
                });
                await newUser.save();
                done(null, newUser);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

module.exports = passport;