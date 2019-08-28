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
    choices: [
      parseInt(req.body.Q1, 10),
      parseInt(req.body.Q2, 10),
      parseInt(req.body.Q3, 10)
    ],
  });
  repos.addUser(User);
  res.redirect("/login");
};
