const express = require("express");
const pug = require("pug");
const path = require("path");
const route = require("./routes/routes.js");
const bodyParser = require("body-parser");
const adminRoute = require("./routes/adminRoutes.js");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));

const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

const checkAuthentication = (req, res, next) => {
  if (req.session.user && req.session.user.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/", checkAuthentication, route.index);

app.get("/create", route.create);
app.post("/create", urlencodedParser, route.createPerson, function(req, res) {
  makeHash(req.body.pass);
  console.log(myHash);
});

app.get("/login", route.login);



app.listen(3000);