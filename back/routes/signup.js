const path = require('path');
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// router.get('/', (req, res) => {
//     res.render('signup');
// });

// router.post('/signup', async (req, res) => {
//     const { email, password } = req.body;
//     console.log(email, password);
//     let username = email;
//     try {
//         let user = await User.findOne({ username });
//         if (user) {
//             res.render('login', {
//                 msg: "User is Already Present"
//             });
//         }
//         else {
//             bcrypt.genSalt(saltRounds, async function (err, salt) {
//                 bcrypt.hash(password, salt, async function (err, hash) {
//                     await User.create({
//                         username,
//                         password:hash
//                     })
//                     res.render('login', {
//                         msg: "Signup Success"
//                     });
//                 });
//             });

//         }
//     }
//     catch (err) {
//         res.send(err);
//     }

// })


router.post('/signup',(req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
      }
    });
  });

module.exports = router;