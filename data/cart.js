export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];


export function addToCart(productId) {
    const matchingitem = cart.find((item) => productId === item.productId); // this stores the reference to the original object
    const quantityselector = document.querySelector(
      `.js-quantity-select[data-product-id="${productId}"]`
    );
    const quantity = parseInt(quantityselector.value);
  
    if (matchingitem) {
      matchingitem.quantity += quantity; // this works because objects are passed by reference and not value
    } else {
      cart.push({ productId: productId, quantity: quantity });
    }
  }
