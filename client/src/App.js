// src/App.js
import React, { useState, useEffect } from "react";
import PropertyList from "./components/ProductList";
import AddProperty from "./components/AddProperty";
import axios from "axios";
import "./App.css";

const App = () => {
	const [properties, setProperties] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3001/api/properties")
			.then((response) => setProperties(response.data))
			.catch((error) => console.error(error));
	}, []); // Empty dependency array to fetch properties once on mount

	const handleAddProperty = (newProperty) => {
		setProperties((prevProperties) => [...prevProperties, newProperty]);
	};

	const handleContactOwner = (contact) => {
		alert(`Contacting the owner of property is ${contact}`);
	};

	const handleDeleteProperty = (propertyId) => {
		axios
			.delete(`http://localhost:3001/api/properties/${propertyId}`)
			.then((response) => {
				// Filter out the deleted property from the state
				setProperties((prevProperties) =>
					prevProperties.filter(
						(property) => property._id !== propertyId
					)
				);
			})
			.catch((error) => console.error(error));
	};

	return (
		<div style={{backgroundColor: "#939597", height: "100vh", padding: "20px"}}>
			<h1 className="gfg" style={{ margin: "10px 10px" }}>
				Keytrack
			</h1>
			<h1 style={{ marginTop: "10px" }}>Real Estate Management</h1>
			<div>
				<AddProperty onAddProperty={handleAddProperty} />
				<PropertyList
					onDeleteProperty={handleDeleteProperty}
					properties={properties}
					onContactOwner={handleContactOwner}
				/>
			</div>
		</div>
	);
};

export default App;
