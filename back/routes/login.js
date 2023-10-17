const path = require('path');
const express = require('express');
const router = express.Router();
const passport = require('passport');

// router.get('/', (req, res) => {
//     res.render('login');
// })

// router.get('/login', (req, res) => {
//     res.render('login');
// })

router.post('/login',
    // passport.authenticate('local', { failureRedirect: '/login' }),
    // function (req, res) {
    //     res.redirect('/profile');
    // });
    (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
          if (err) throw err;
          if (!user) res.send("No User Exists");
          else {
            req.logIn(user, (err) => {
              if (err) throw err;
              res.send("Successfully Authenticated");
              console.log(req.user);
            });
          }
        })(req, res, next);
      });


module.exports = router;