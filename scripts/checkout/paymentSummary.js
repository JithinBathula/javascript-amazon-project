import { cart } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { getProductUsingId } from "../../data/products.js";
import { getDeliverOptionUsingId } from "../../data/deliveryOptions.js";
import { totalQuantity } from "../../data/cart.js";

export function renderPaymentSummary(){

    let itemsprice = 0
    let shippingCosts = 0
    cart.forEach(element => {
        const matchingProduct = getProductUsingId(element.productId)
        const price = matchingProduct.priceCents
        itemsprice += element.quantity * price

        const deliveryoption = getDeliverOptionUsingId(element.deliverOptionId)
        shippingCosts += deliveryoption.priceCents
    });

    const totalBeforeTax = shippingCosts+ itemsprice
    const tax = totalBeforeTax * 0.1
    const totalPrice = tax + totalBeforeTax
    console.log(totalPrice)


    const paymentHTML = `
        <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(itemsprice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(shippingCosts)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `

    document.querySelector(".js-payment-summary").innerHTML = paymentHTML


    
}