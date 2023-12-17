const express = require('express');
const router = express.Router();

const userModel = require('./users');
const postModel = require('./post');
const passport = require('passport');

// User login using this 2 line 
const localStrategy = require("passport-local");
passport.authenticate(new localStrategy(userModel.authenticate()));

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect("/");
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', isLoggedIn, (req, res, next) => {
 res.send("profile");
});

router.post('/register', (req, res) => {
  const userData = new userModel({
    username: req.params.username,
    email: req.params.email,
    fullname: req.params.fullname
  })

  userModel.register(userData, req.body.password)
  .then(function() {
    passport.authenticate("local")(req, res, function() {
      res.redirect("/profile")
    })
  })
})

router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function(req, res) {

})
router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.redirect('/');
  });
})


module.exports = router;