export let cart = JSON.parse(localStorage.getItem('cart'))
if (!cart){
  cart = [];
}

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
    const matchingitem = cart.find((item) => productId === item.productId); // this stores the reference to the original object
    const quantityselector = document.querySelector(
      `.js-quantity-select[data-product-id="${productId}"]`
    );
    const quantity = parseInt(quantityselector.value);
  
    if (matchingitem) {
      matchingitem.quantity += quantity; // this works because objects are passed by reference and not value
    } else {
      cart.push({ productId: productId, quantity: quantity, deliverOptionId: 1 });
    }

    saveToStorage()
  }


export function removefromcart(productid){
  cart = cart.filter((cartItem) => cartItem.productId !== productid)
  saveToStorage()

}

export function updateQuantity(productid, new_quantity){
  const matchingitem = cart.find((item) => item.productId === productid)
  matchingitem.quantity = new_quantity

  saveToStorage()

}

export function updateDeliveryOption(productid, deliveroption){
  const matchingitem = cart.find((item) => item.productId === productid)
  matchingitem.deliverOptionId = deliveroption

  saveToStorage()
}