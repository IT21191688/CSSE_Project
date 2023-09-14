var GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');
const User = require('./models/user.model');


const googleAuth = (passport) => {

    passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_REDIRECT_URL
    },
        async function (accessToken, refreshToken, profile, cb) {

            const userObject = {
                googleid: profile.id,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                email: profile.emails[0].value,
                role: "user"
            }

            console.log(userObject)
            const user = await User.findOne({ googleid: profile.id })

            if (user) {
                return cb(null, user)
            }
            User.create(userObject).then(() => {
                return cb(null, user);
            }).catch((err) => {
                return cb(err.message);
            })

            return cb(null, profile);
        }
    ));

    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        User.findById(id, function (err, user) {
            cb(err, user);
        });
    });

}


module.exports = googleAuth;

