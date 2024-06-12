require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs"); //instead of the html
const expressLayout = require("express-ejs-layouts");
const path = require("path"); //make easy with working with the path
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("express-flash");
const Mongodbstore = require("connect-mongo")(session); //it is basically stores the session in the db's....

app.use(express.json());

/****************************db calls ********************/
const url = "mongodb://localhost/pizza";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection
  .once("open", () => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("Connection Issues with Database", err);
    process.exit(1);
  });

/******************************************************** */

let mongostore = new Mongodbstore({
  mongooseConnection: connection,
  collection: "session", //it is basicaly create an tables in the db which is  used to stores the session in the db's
});

/*session use for the storing the cart items.... */
app.use(
  session({
    secret:
      "kerajiii" /*here we have to  add the secrect forn the .env files  */,
    resave: false,
    store: mongostore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hour
  })
);

app.use(flash());

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(express.static("public")); //after add  this color is applied to this

// Set the view engine and views directory
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app); /*it is basically function which  define all the routes  (app) is basically instannces passed to the routes file functions*/

// Use the layout middleware

// Define routes

// Start the server
app.listen(PORT, () => {
  console.log("app is running successfully on port", PORT);
});
