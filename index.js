const express = require("express");
const pug = require("pug");
const path = require("path");
const route = require("./routes/routes.js");
const bodyParser = require("body-parser");
const adminRoute = require("./routes/adminRoutes.js");
const repos = require("./data/repository.js");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));

const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

// const checkAuthentication = (req, res, next) => {
//   if (req.session.user && req.session.user.isAuthenticated) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// };

// function(req, res) {
//     if (req.cookies.beenHereBefore === "yes") {
//       res.send("You have been here before");
//     } else {
//       res.cookie("beenHereBefore", "yes");
//       res.send("This is your first time");
//     }
//   }

const verify = (req, res) => {
    var verified = repos.verifyLogin(req.sessions.username);
    if (verified == true) {
      next();
    } else {
      res.redirect("/login");
    }
};

app.get("/", verify, route.index);

app.get("/create", route.create);
app.post("/create", urlencodedParser, route.createPerson);

app.get("/login", route.login);
app.post("/login", );

app.get('/admin', adminRoute.admin);

app.listen(3000);
