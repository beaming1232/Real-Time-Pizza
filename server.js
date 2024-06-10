const express = require("express");
const app = express();
const ejs = require("ejs");//instead of the html
const expressLayout = require("express-ejs-layouts");
const path = require('path')//make easy with working with the path



const PORT = process.env.PORT || 3000;

app.use(express.static('public')) //after add  this color is applied to this 
  


 
// Set the view engine and views directory
app.use(expressLayout);
app.set('views', path.join(__dirname,'/resources/views'));
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render('home');
});

app.get("/cart",(req,res)=>{
    res.render('customers/cart');
});


app.get("/login",(req,res)=>{
    res.render('auth/login')
})

app.get("/register",(req,res)=>{
    res.render('auth/register')
})


// Use the layout middleware

// Define routes


// Start the server
app.listen(PORT, () => {
    console.log("app is running successfully on port", PORT);
});
