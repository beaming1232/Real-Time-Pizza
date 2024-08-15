import axios from 'axios'
import Noty from 'noty'
import {initAdmin} from "./admin"
//import { json } from 'stream/consumers';
import moment from 'moment';


//ADD THE ANY PIZZA TO THE SESSION AND THEN UPDATE THE CART SESCTION BY FECTHING THE VALUES IN THE SESSIONS 
let addTocart=document.querySelectorAll('.add-to-cart');
let cartCounter=document.querySelector('#cartCounter')
 
function updateCart(pizza){
    //this is basically ading the add to cart to the session create of the db's
    axios.post('/update-cart',pizza).then( res=>{
        //console.log(res);
        cartCounter.innerText=res.data.totalQty; //here we update the the cart at the navbar prresent  cartcounter...

        new Noty({
            type:'success',
            timeout:1000,
            text: 'ADDED  SUCESSFULLY',
          }).show()

    })   
}

addTocart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
    
    let pizza=JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
    
    })
})


//const alertmsg=require("#success-alert")
//
//  if(alertmsg){
//    setTimeout((alertmsg) => {
//        alertmsg.remove();
//        
//    }, 2000);
//  }
//
  initAdmin(); //it is  basically call the functon present in  the admin.js file used for the ajax calling




  //Change order status
  let statuses = document.querySelectorAll('.status_line')

  let hiddenInput = document.querySelector('#hiddenInput')
  let order = hiddenInput ? hiddenInput.value : null
  order = JSON.parse(order)
  let time = document.createElement('small')
  
  function updateStatus(order) {
    
      let stepCompleted = true;
      statuses.forEach((status) => {
         let dataProp = status.dataset.status
         if(stepCompleted) {
              status.classList.add('step-completed') //classlist is basically used to add remove and  togle the css classes......
         }
         if(dataProp === order.status) {
              stepCompleted = false
              time.innerText = moment(order.updatedAt).format('hh:mm A')
              status.appendChild(time)
             if(status.nextElementSibling) {
              status.nextElementSibling.classList.add('current') //it is basicaaly adding the or marking element as an the currents of ul>li in singleorder  so that we can apply the property of the current element of scss
             }
         }
      })
  
  }
  
  updateStatus(order);
