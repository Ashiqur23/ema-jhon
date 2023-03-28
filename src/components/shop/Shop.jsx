import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
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
  useEffect(()=>{
    const storedCart = getShoppingCart()
    const savedCart = []
    // step -1: get id of the added product
    for(const id in storedCart){
        // step-2: get product from products state by using id
        const addedProducts = products.find(product => product.id === id)
        if(addedProducts){
            // step -3: add quantity
            const quantity = storedCart[id]
            addedProducts.quantity = quantity;
            // step - 4: add the added Product to the saved cart
            savedCart.push(addedProducts)
        }
        // step -5 ; push the cart
        setCart(savedCart)
    }
  },[products])
  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };
  return (
    <div className="shop-Container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            {...product}
            key={product.id}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
