const order = require("../../../models/order")



function AdminorderController() {
    return {
        index(req, res) {
           order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, orders) => {
               if(req.xhr) {
                console.log("data inside the admin index",orders);
                 return res.json(orders) //if  the ajax call is there then send the  data to the admin.js file
               } else {
                return res.render('admin/orders')//if the ajax call is not there then we have to show the page this page then  embedded ajax call data..
               }
           })
        },
        
    }
}

module.exports = AdminorderController;