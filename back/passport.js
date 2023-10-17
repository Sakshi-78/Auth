// const passport = require('passport');
// const User = require("./models/");
// const LocalStrategy = require('passport-local');
// const bcrypt = require('bcrypt');


// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// },
//     async function (email, password, done) {
//         console.log("Here", email, password);
//         try {
//             let user = await User.findOne({ username: email });
//             if (!user) { return done(null, false); }
//             bcrypt.compare(password, user.password).then(function (result) {
//                 if (result == false) return done(null, false);
//                 return done(null, user);
//             });

//         }
//         catch (err) {
//             if (err) { return done(err); }
//         }
//     }
// ));



// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     User.findById(id)
//         .then((user) => {
//             done(null, user);
//         })
//         .catch(err => {
//             done(err, false);
//         })

// });

// module.exports = passport;

const passport = require('passport');
const User = require("./models/users");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;


module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};

module.exports = passport;