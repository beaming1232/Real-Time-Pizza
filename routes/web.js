const homeController=require("../app/http/controllers/homeController")
const authController=require("../app/http/controllers/authController")
const cartController=require("../app/http/controllers/customers/cartController")
const orderController=require("../app/http/controllers/customers/orderController")
const guest=require("../app/http/middlewares/guest")
const auth=require("../app/http/middlewares/auth")
const admin=require("../app/http/middlewares/admin")
const AdminorderController=require("../app/http/controllers/admin/orderController")
const statusController=require("../app/http/controllers/admin/statusController")
function initRoutes (app){
    //here we have the mapping of  the controllers and routes
    
    {/*(req, res) => {
        res.render('home');//here this all work done by the controllers
        } */}
        
        
    app.get("/",homeController().index);
    
    /*routes for the registers */
     app.get("/register",guest,authController().register);//GET THE INFOREMATION FORM THE SERVER AND SHOW ON THE FRONT END...
     app.post("/register",authController().postRegister);//SEND THE INFORMATION TO THE SERVER....

     /*routes for the login */
    app.get("/login",guest,authController().login);
    app.post("/login",authController().postLogin);//i have to complete the passport after  that see this code....
    


     app.post("/logout",authController().logout)
     

    app.get("/cart",cartController().index)
    app.post("/update-cart",cartController().update);
    

    /*controllers for the oredres */
    //IN BELOW WE ADD THE AUTH MIDDLWEARE AUTH CHECK IF THE USER IS LOGIN OR NOT BY METHOD PROVIDED BY THE PAPPOSRT ->ISATHUNTICATED
    app.post("/orders",auth,orderController().store); //ONCES WE PUT AN PHONE  AND EMAIL TO THE FORM THIS FORM HAS POST MEATHOS WHICH REACH HERE ATER THAT ALL THE PIZZAS AT THE CART SECTION STORE IN THE DB ORDER SECTION AND THE ADD-TO-CART BECOME EMPTY...
    app.get("/customer/orders",auth,orderController().index);//index controllers is the basically return all the add to cart pizzas
    app.get("/customer/orders/:id",orderController().show);//HERE WE HAVE AN DYNAMIC ID WE CREATE AN STATUS FOR EACH ID THAT WHY WE NEED TO PASS IT ID OF THE EACH ORDER..
    
    
    //Admin controllers...
    app.get("/admin/orders",admin,AdminorderController().index);
    app.post("/admin/order/status",admin,statusController().update)


}


module.exports=initRoutes;