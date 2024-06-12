import axios from 'axios'
import Noty from 'noty'

let addTocart=document.querySelectorAll('.add-to-cart');

let cartCounter=document.querySelector('#cartCounter')

 
function updateCart(pizza){
    //this is basically ading the add to cart to the session create of the db's
    axios.post('/update-cart',pizza).then( res=>{
        console.log(res);
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
    console.log(pizza);
    })
})

