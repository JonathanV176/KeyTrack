import React from "react";
import "../App.css";

const ProductItem = ({ product, onDelete, showDetails, toggleDetails }) => {
    return (
        <li className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.title}</h3>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Type: {product.type}</p>
            <button onClick={toggleDetails}>
                {showDetails ? "Hide Details" : "Show Details"}
            </button>
            {showDetails && (
                <div className="product-details">
                    <p>Description: {product.description}</p>
                    <p>Contact: {product.contact}</p>
                </div>
            )}
            <button onClick={onDelete}>Delete</button>
        </li>
    );
};

export default ProductItem;