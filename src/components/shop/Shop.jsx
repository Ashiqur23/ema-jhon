import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    useEffect(() =>{
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    } , [])
    return (
        <div className='shop-Container'>
            <div className="products-container">
                
                {
                    products.map(product =>
                        <Product
                         {...product}
                         key = {product.id}>

                         </Product>)
                }
            </div>
            <div className="cart-container">
                <h4>oder summary</h4>
            </div>
        </div>
    );
};

export default Shop;