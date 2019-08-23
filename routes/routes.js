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

exports.createPerson = function (req, res) {
  var person = new Person({
    username: req.body.username,
    age: req.body.age,
    email: req.body.email,
    password: req.body.pass,
    Q1: req.body.Q1,
    Q2: req.body.Q2,
    Q3: req.body.Q3
  });
  person.save(function (err, person) {
    if (err) return console.error(err);
    console.log(req.body.username + ' added');
  });
  res.redirect('/');
};

