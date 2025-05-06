//components/ProductList.js

import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "../App.css";

const ProductList = ({ properties, onDeleteProperty }) => {
	const [sortedProducts, setSortedProducts] = useState([...properties]);
	// Keep a local state for sorted products
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(3000);
	const [selectedType, setSelectedType] = useState("all");
	// 'all' represents no type filter
	const [expandedCard, setExpandedCard] = useState(null);

	useEffect(() => {
		setSortedProducts([...properties]);
	}, [properties]);

	const handleSortByPrice = () => {
		const sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
		setSortedProducts(sorted);
	};

	const handleFilterByPriceRange = () => {
		const filtered = properties.filter(
			(product) => product.price >= minPrice && product.price <= maxPrice
		);
		setSortedProducts(filtered);
	};

	const handleFilterByType = () => {
		if (selectedType === "all") {
			// Reset the type filter
			setSortedProducts([...properties]);
		} else {
			const filtered = properties.filter(
				(product) => product.type === selectedType
			);
			setSortedProducts(filtered);
		}
	};

	const toggleDetails = (id) => {
		setExpandedCard(expandedCard === id ? null : id);
	};

	return (
		<div className="prdt-list">
			<h2>Product List</h2>
			<div className="filter-btn">
				<button onClick={handleSortByPrice}>Sort by Price</button>
				<label>
					Min Price:
					<input
						type="number"
						value={minPrice}
						onChange={(e) => setMinPrice(Number(e.target.value))}
					/>
				</label>
				<label>
					Max Price:
					<input
						type="number"
						value={maxPrice}
						onChange={(e) => setMaxPrice(Number(e.target.value))}
					/>
				</label>
				<button onClick={() => handleFilterByPriceRange()}>
					Filter by Price Range
				</button>
				<label>
					Filter by Type:
					<select
						value={selectedType}
						onChange={(e) => setSelectedType(e.target.value)}
					>
						<option value="all">All</option>
						<option value="Fruit">Fruit</option>
						<option value="Vegetable">Vegetable</option>
						{/* Add more options as needed */}
					</select>
				</label>
				<button onClick={handleFilterByType}>Filter by Type</button>
			</div>
			<ul className="item-card">
				{sortedProducts.map((product) => (
					<ProductItem
						key={product._id}
						product={product}
						onDelete={() => onDeleteProperty(product._id)}
						showDetails={expandedCard === product._id}
						toggleDetails={() => toggleDetails(product._id)}
					/>
				))}
			</ul>
			<div className="buy-now-btn">Buy Now</div>
		</div>
	);
};

export default ProductList;
