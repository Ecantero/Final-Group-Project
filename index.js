const express = require("express");
const pug = require("pug");
const path = require("path");
const route = require("./routes/route.js");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));

const urlencodedParser = bodyParser.urlencoded({
  extended: true  
});

const checkAuthentication = (req, res, next) => 
{
    if(req.session.user && req.session.user.isAuthenticated)
    {
        next();
    }
    else
    {
        res.redirect('/');
    }
}

app.get("/", route.index);
app.get("");