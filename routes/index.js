const express = require('express');
const router = express.Router();

const userModel = require('./users')
const postModel = require('./post')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createUser', async (req, res, next) => {
  let createdUser = await userModel.create({
    username: "Rashmi",
    password: "kanuaje",
    posts: [],
    dp: String, 
    email: "rashmi@gmail.com",
    fullname: "Rashmi kanuaje"
  });
  res.send(createdUser);
});

router.get('/createPost', async (req, res, next) => {
    let createdPost = await postModel.create({
      postText: "Hii Everyone",
      user: "65646b2e8a51588e771a1b19"
    })
    res.send(createdPost);
});

module.exports = router;