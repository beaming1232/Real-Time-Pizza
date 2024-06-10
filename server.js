const express = require("express");
const app = express();
const ejs = require("ejs");//instead og the html
const expressLayout = require("express-ejs-layouts");
const path = require('path');//make easy with working with the path



const PORT = process.env.PORT || 3000;

app.use(express.static('public')) //after add  this color is applied to this 

// Set the view engine and views directory
app.set(expressLayout);
app.set('views', path.join(__dirname,'/resources/views'));
app.set('view engine', 'ejs');

// Use the layout middleware

// Define routes
app.get("/", (req, res) => {
    res.render('home');
});

// Start the server
app.listen(PORT, () => {
    console.log("app is running successfully on port", PORT);
});
