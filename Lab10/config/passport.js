const GoogleStrategy = require('passport-google-oauth20').Strategy
const Account = require('../models/account')

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                //get the user data from google 
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                    email: profile.emails[0].value
                }

                try {
                    //find the user in our database
                    let user = await Account.findOne({ googleId: profile.id })

                    if (user) {
                        //If user present in our database.
                        done(null, user)
                    } else {
                        // if user is not preset in our database save user data to database.
                        user = await Account.create(newUser)
                        done(null, user)
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        )
    )

    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    // used to deserialize the user
    passport.deserializeUser(async (id, done) => {
        try {
            var account = await Account.findById(id)
            done(null, account);
        } catch (err) {
            done(err, id);
        }
    })
} 