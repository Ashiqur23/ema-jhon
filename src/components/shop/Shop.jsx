import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  //   fetch api and set State
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //   get shopping cart in local storage
  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step -1: get id of the added product
    for (const id in storedCart) {
      // step-2: get product from products state by using id
      const addedProducts = products.find((product) => product.id === id);
      if (addedProducts) {
        // step -3: add quantity
        const quantity = storedCart[id];
        addedProducts.quantity = quantity;
        // step - 4: add the added Product to the saved cart
        savedCart.push(addedProducts);
      }
      // step -5 ; push the cart
      setCart(savedCart);
    }
  }, [products]);
  const handleAddToCart = (product) => {
    // console.log(product)
    // const newCart = [...cart, product];
    let newCart = [];
    // if product doesn't exist in the cart then set quantity = 1
    // update exist update quantity by 1
    console.log(cart);
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    addToDb(product.id);
  };
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart handleClearCart={handleClearCart} cart={cart}></Cart>
      </div>
    </div>
  );
};
export default Shop;
