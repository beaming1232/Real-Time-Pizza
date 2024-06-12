

function authController(){

    return {
        login(req,res){

        //here we can send  and any data form the server to  the auth/login  can used like homecontrollers send ans pizzas inforamtions
            res.render('auth/login')

        },
        register(req,res){
        //here we can send  and any data form the server to  the auth/login  can used like homecontrollers send ans pizzas inforamtions
            res.render('auth/register')
        }
    }
}

module.exports=authController;