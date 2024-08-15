const { Console } = require("console");
const order=require("../../../models/order")
const moment=require("moment")

function orderController() {
    
    return {
        store(req,res){
            const {phone,address}=req.body;

            if(!phone || !address){
                req.flash('error',"all fileds are required")
                return res.redirect('/cart')
            }

            const Order=new order({
                customerId:req.user._id,
                items:req.session.cart.items,
                phone:phone,
                address:address

            })

            Order.save().then(result=>{

                req.flash('success','ordere placed successfully')
                //ONCES THE ORDERES GET THE SUCESS THEN WE HAVE MAKE AN ADD TO CART FILEDS EMPTY SO  FOR THAT 
                //WE DELEETD AN CART DATA FORM THE  CURRENTS  SESSIONS ...
                 delete  req.session.cart
                return res.redirect("/customer/orders")

            }).catch(err=>{

                req.flash("error","SOMENTHING WENT WRONG")


                return res.redirect("/cart");
            })


        
        

          
        },

       async index(req,res){
            //here we have to find all the orders of the particular customers 
            //CUSTOMERS DETAILS ARE  BASCIALLY PRESENT IN THE  REQ.BODY SO FETCH THIS CUSTOMERS ID  AND FIND IN THE D.B PARICULAR USER IS PRESENT OR NOT
            
            //alaways make sure that new the orderes is at the top
           // const Orders=await order.find({customerId: req.user._id}->normal orders finding ....
            const Orders=await order.find({customerId: req.user._id},null,{sort:{'createdAt':-1}})//->asecnding orderes finding query


            
            
           return res.render('customers/orders',{orders:Orders,moment:moment})
        },
        
        //used to track the orders bar...
       async show(req,res){

        const  Order=await order.findById(req.params.id);

         //authorized the users...->it can happen that another person who not ordered the pizza can track the orderes by their ordered id
         //so first check if the requsetd use have the id same as the id in the orderd database
         
         if(req.user._id.toString() === Order.customerId.toString()) {
            return res.render('customers/singleOrder', { Order:Order })
        }
        return  res.redirect('/')



        }
    }
    
}

module.exports = orderController; 