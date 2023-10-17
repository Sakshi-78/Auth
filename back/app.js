const path = require('path');
const express = require('express');
const app = express();
const PORT = 4454;
const session = require('express-session');
const passport = require('./passport');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'asdjbaskdba',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// app.use(express.static(path.join(__dirname,'')));
// app.use('/',require('./routes/login'));

// app.use('/signup',require('./routes/signup'))

// app.use("/login",passport.authenticate('local'),require("./routes/login"));
// app.use("/signup",passport.authenticate('local'),require("./routes/signup"));

app.get("/login",(req,res,next)=>{
    console.log("Hello");
})
app.post("/login", (req, res, next) => {
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
  app.post("/signup", (req, res) => {
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

app.get('/profile',passport.authenticate('local'),(req,res)=>{
    console.log(req.user);
    res.render('profile',{
        username: req.user.username
    });
})


mongoose.connect('mongodb://127.0.0.1/testdb')
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })
    .catch(err=>{
        console.log("Connection err: ",err);
    })