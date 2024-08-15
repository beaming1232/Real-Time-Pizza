const Menu = require('../../models/menu')
function homeController() {
   
    return {
        
       async index(req,res){
        const pizzas=await Menu.find()
       // console.log("inside the pizzas",pizzas);
        return res.render('home',{pizzas:pizzas}) // pizzas->it is an objects  send it to the front end home file 

        }   

    }
}


module.exports = homeController;