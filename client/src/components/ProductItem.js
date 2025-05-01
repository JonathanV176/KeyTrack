import React from "react";
import "../App.css";

const ProductItem = ({ product }) => {
    return (
        <li className="product-item">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Type: {product.type}</p>
        </li>
    );
};

export default ProductItem;