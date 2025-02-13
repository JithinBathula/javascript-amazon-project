export let cart;

export function loadCart(){
  cart = JSON.parse(localStorage.getItem('cart'))
  if (!cart){
  cart = [];
}
}

loadCart()


export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
    const matchingitem = cart.find((item) => productId === item.productId); // this stores the reference to the original objec
  
    if (matchingitem) {
      matchingitem.quantity += 1; // this works because objects are passed by reference and not value
    } else {
      cart.push({ productId: productId, quantity: 1, deliverOptionId: 1 });
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

export function totalQuantity(){
  let cartquantity = 0
  
  cart.forEach(element => {
    cartquantity += element.quantity
  });

  return cartquantity
}