const express = require("express");
const pug = require("pug");
const path = require("path");
const route = require("./routes/routes.js");
const bodyParser = require("body-parser");
const adminRoute = require("./routes/adminRoutes.js");
const repos = require("./data/repository.js");
const expressSession = require("express-session");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));

const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

const checkAuthentication = (req, res, next) => {
  if (req.session.username && req.session.username.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

const userObject = (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
}

app.use(expressSession({secret: 'passowrd', saveUninitialized: true, resave: true}));

app.get("/", repos.verifyLogin);
app.post("/", route.index);

app.get("/create", route.create);
app.post("/create", urlencodedParser, route.createPerson);

app.get("/login", route.login);
app.post("/login", route.login);

app.get('/admin', adminRoute.admin);
app.post('/admin/suspend', urlencodedParser, adminRoute.suspend);

app.get('/viewProfile/:id', checkAuthentication);

app.listen(3000);
