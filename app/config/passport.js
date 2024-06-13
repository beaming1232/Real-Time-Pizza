const LocalStrategy = require('passport-local').Strategy
const user = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // Login
        // check if email exists
        const User = await user.findOne({ email: email })
        if(!User) {
            return done(null, false, { message: 'No user with this email' })
        }

        bcrypt.compare(password, User.password).then(match => {
            if(match) {
                return done(null, User, { message: 'Logged in succesfully' })
            }
            return done(null, false, { message: 'Wrong username or password' })
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong' })
        })
    }))

    passport.serializeUser((User, done) => {
        done(null, User._id)
    })

    passport.deserializeUser((id, done) => {
        user.findById(id, (err, User) => {
            done(err, User)
        })
    })

}

module.exports = init