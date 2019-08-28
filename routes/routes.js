const user = require("../data/user.js");
const repos = require("../data/repository.js");

exports.index = (req, res) => {
  res.render("index", {
    title: "Hompage"
  });
};

exports.login = (req, res) => {
  res.render("login", {
    title: "Login"
  });
};

exports.create = (req, res) => {
  res.render("create", {
    title: "Create Account"
  });
};

exports.viewProfile = (req, res) => {
  let requestID = req.params.id;
  let isIdValid = repos.getUsers({username: req.body.username});
  if(isIdValid)
  {
    Profile.findById(requestID, (err, profile) => {
      if(err)
      {
        return console.error(err);
      }
      res.render("viewProfile", {
        title: `${profile.user_name}'s Page`,
        profile: profile
      });
    });

  }
  else
  {
    
    res.redirect('/')
  }
};

let bycrypt = require("bcrypt-nodejs");
let hashPassword = (passwordStr) => {
  return bycrypt.hashSync(passwordStr);
  // bycrypt.hash(passwordStr, null, null, (err, hash) => {
  //   passHash = hash;
  //   console.log('password hashed');
  //   return passHash;
  // });
};

exports.createPerson = function (req, res) {
  let hashed = hashPassword(req.body.password)
  let User = new user({
    username: req.body.username,
    age: req.body.age,
    email: req.body.email,
    password: hashed,
    role: req.body.admin,
    choices: [
      parseInt(req.body.Q1, 10),
      parseInt(req.body.Q2, 10),
      parseInt(req.body.Q3, 10)
    ],
  });
  repos.addUser(User);
  res.redirect("/login");
};
