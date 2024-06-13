const user=require("../../models/user")
const bcrypt=require("bcrypt")
const passport=require("passport")

function authController(){

    return {
        login(req,res){

        //here we can send  and any data form the server to  the auth/login  can used like homecontrollers send ans pizzas inforamtions
            res.render('auth/login')
        },
        register(req, res) {
            res.render('auth/register')
        },
        //AN POST LOGIN IS BASICALLY METHODS FOR CHECK IF  THE USER IS LOGIN OR NOT I AM NOT UNDERSTAN HERE I HAVE TO CHECK syntax and the concepts....
       
        async postRegister(req,res){
            const {name,email,password}=req.body;
            //valideta the req..
            if(!name || !email || !password){
                req.flash('error','All filed are required')//HERE ERROR IS KEY AND OTHER IS MESSAGE ONCES THE SERVER IS RESPOND TO THE CLIENTS FLASH IS SEND IT AS  THE OBJECTS OF MESSAGES THIS MESSSAGE.KEY IS USED FOR THE DEBUGGING
                req.flash('name',name);//HERE ERROR IS KEY AND OTHER IS MESSAGE ONCES THE SERVER IS RESPOND TO THE CLIENTS FLASH IS SEND IT AS  THE OBJECTS OF MESSAGES THIS MESSSAGE.KEY IS USED FOR THE DEBUGGING
                req.flash('email',email);//HERE ERROR IS KEY AND OTHER IS MESSAGE ONCES THE SERVER IS RESPOND TO THE CLIENTS FLASH IS SEND IT AS  THE OBJECTS OF MESSAGES THIS MESSSAGE.KEY IS USED FOR THE DEBUGGING

                return res.redirect('/register');
            }


            
            user.exists({email:email},(err,result)=>{
                if(result){
                    req.flash('error','EMAIL IS EXISTST !')//HERE ERROR IS KEY AND OTHER IS MESSAGE ONCES THE SERVER IS RESPOND TO THE CLIENTS FLASH IS SEND IT AS  THE OBJECTS OF MESSAGES THIS MESSSAGE.KEY IS USED FOR THE DEBUGGING
                    req.flash('name',name);//HERE ERROR IS KEY AND OTHER IS MESSAGE ONCES THE SERVER IS RESPOND TO THE CLIENTS FLASH IS SEND IT AS  THE OBJECTS OF MESSAGES THIS MESSSAGE.KEY IS USED FOR THE DEBUGGING
                    req.flash('email',email);//HERE ERROR IS KEY AND OTHER IS MESSAGE ONCES THE SERVER IS RESPOND TO THE CLIENTS FLASH IS SEND IT AS  THE OBJECTS OF MESSAGES THIS MESSSAGE.KEY IS USED FOR THE DEBUGGING

                  return res.redirect('/register')
                }
            })

            //FOR  THE PASSWORD SAVE IN THE D.B WE NEED TO ENCRYPTS IT FIRST...
             let haspassword=await bcrypt.hash(password,10);

            const User=new user({
                name:name,
                email:email,
                password:haspassword
            })


            User.save().then(()=>{
                return res.redirect("/register")

            }).catch((err)=>{
                req.flash('error','SOMENTHING WENT WRONG !')//HERE ERROR IS KEY AND OTHER IS MESSAGE ONCES THE SERVER IS RESPOND TO THE CLIENTS FLASH IS SEND IT AS  THE OBJECTS OF MESSAGES THIS MESSSAGE.KEY IS USED FOR THE DEBUGGING

                return res.redirect("/register")
            })


            

        },
        
        postLogin(req, res, next) {
            const { email, password }   = req.body
           // Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }

                    return res.redirect("/")
                })
            })(req, res, next)
        },
        logout(req,res){
            req.logout() //it is basically logout form the passport...
            return res.redirect('/login');

        },

    }
}

module.exports=authController;