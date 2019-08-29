const user = require("../data/user.js");
const repos = require("../data/repository.js");

exports.index = async (req, res) => {
  if(await repos.verifyLogin(req.session.user)){
    res.render("index", {
      title: "Homepage"
    });
  }
  else {
    res.redirect('/login');
  }
};

exports.login = (req, res) => {
  res.render("login", {
    title: "Login"
  });
};

exports.sessionlogin = async (req, res) =>{
  let user = await repos.getUserByUsername(req.body.username);
  user = user[0];
  if(user){
    let hashed = user.password;
    user.password = req.body.pass;
    let matched = await repos.verifyLogin(user)
    if(matched){
      req.session.user = user;
      res.redirect('/');
    }
    else {
      res.redirect('/login');
    }

  }
  else {
    res.redirect('/login');
  }

  
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

let bycrypt = require("bcryptjs");
let hashPassword = (passwordStr) => {
  return bycrypt.hashSync(passwordStr);
  // bycrypt.hash(passwordStr, null, null, (err, hash) => {
  //   passHash = hash;
  //   console.log('password hashed');
  //   return passHash;
  // });
};

exports.createPerson = function (req, res) {
  let hashed = hashPassword(req.body.pass)
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

exports.logoutOfAccount = (req, res) => {
  req.session.destroy((err) => {
    if(err){
        console.log(err);
    }
    else
    {
        res.redirect('/');
    }
});
};