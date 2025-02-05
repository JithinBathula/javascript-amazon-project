import { cart, removefromcart, updateQuantity, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { deliveryOptions } from "../data/deliveryOptions.js";

let cartHTML = ``

cart.forEach(cartItem => {
    const matchProduct = products.find((item) => cartItem.productId === item.id)

    const deliveryoption = deliveryOptions.find(opt => opt.id === cartItem.deliverOptionId)
    const today = dayjs();
    const deliverydate = today.add(deliveryoption.deliverydays, 'day');
    const deliverydatestring = deliverydate.format("dddd, MMMM D, YYYY");
    
        cartHTML += `          
        <div class="cart-item-container js-cart-item-container-${matchProduct.id}">
            <div class="delivery-date">
              Delivery date: ${deliverydatestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${matchProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                ${deliveroptionshtml(cartItem)}
              </div>
            </div>
        </div>`
});

document.querySelector(".js-order-summary").innerHTML = cartHTML

document.querySelectorAll(".js-delete-link").forEach( (link)=> {
    link.addEventListener('click', () => {

      const remove_product_id = link.dataset.productId;
 
      removefromcart(remove_product_id )

      const remove_product_html = document.querySelector(`.js-cart-item-container-${link.dataset.productId}`)
      remove_product_html.remove()
      quantity()
    })
} )

quantity()


function quantity(){
  let cartquantity = 0;
  cart.forEach((element) => {
    cartquantity += element.quantity;
  });
  
  document.querySelector(".js-return-to-home-link").innerHTML = cartquantity
}


document.querySelectorAll(".js-update-quantity-link").forEach(link => {
  link.addEventListener("click", () => {

    const product_id = link.dataset.productId
    console.log(product_id)
    const cart_container = document.querySelector(`.js-cart-item-container-${product_id}`)
    cart_container.classList.add('is-editing-quantity')


  })
});



document.querySelectorAll(".js-save-quantity-link").forEach(link => {
  link.addEventListener("click", () => {

    const product_id = link.dataset.productId
    console.log(product_id)
    const cart_container = document.querySelector(`.js-cart-item-container-${product_id}`)
    cart_container.classList.remove('is-editing-quantity')

    const input_tag = document.querySelector(`.js-cart-item-container-${product_id} .quantity-input`)
    const new_quantity = parseInt(input_tag.value)

    if (new_quantity < 0 || new_quantity > 1000){
      alert("Quantity of the product must be between 0 and 1000")
      return
    }

    console.log(new_quantity)

    updateQuantity(product_id, new_quantity)

    document.querySelector(`.js-quantity-label-${product_id}`).innerHTML = new_quantity
    quantity()

  })
});


document.querySelectorAll(".js-delivery-option").forEach( (element) => 

  element.addEventListener("click", ()=>{ 

      const {productId, deliveryopt} = element.dataset
      console.log(productId, deliveryopt)
      updateDeliveryOption(productId, parseInt(deliveryopt))
  })
)

function deliveroptionshtml(cartItem){

  let delhtml = ``
  deliveryOptions.forEach( (deliveryoption) => {
    const today = dayjs()
    const deliverydate = today.add(deliveryoption.deliverydays, 'day')
    const deliverydatestring = deliverydate.format("dddd, MMMM D, YYYY")
    const pricestring = deliveryoption.priceCents === 0 ? 'Free' : `$${formatCurrency(deliveryoption.priceCents)} - `
    const isChecked = cartItem.deliverOptionId === deliveryoption.id ? "checked" : ""
    delhtml += `<div class="delivery-option">
                  <input type="radio" class="delivery-option-input js-delivery-option" ${isChecked} data-product-id="${cartItem.productId}" data-deliveryopt="${deliveryoption.id}"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      ${deliverydatestring}
                    </div>
                    <div class="delivery-option-price">
                      ${pricestring} Shipping
                    </div>
                  </div>
                </div>`

  })

  return delhtml
}


