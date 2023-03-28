import React from "react";
import "./Cart.css";

const Cart = ({cart}) => {
    // const {cart} = props;
    console.log(cart)
    let total = 0;
    let shipping = 0;
    for(const product of cart){
        total = total + product.price
        shipping = shipping + product.shipping
    }
    const tax = total * 5 / 100;
    const grandTotal = parseInt(total + tax + shipping)
  return (
    <div className="cart">
      <h4>oder summary</h4>
      <p>Selected Items: {cart.length}</p>
      <p>Total Price: ${total}</p>
      <p>Total Shipping Charge: ${shipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h6>Grand Total: ${grandTotal}</h6>
    </div>
  );
};

export default Cart;
