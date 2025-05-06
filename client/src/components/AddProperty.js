// src/components/AddProperty.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

const AddProperty = ({ onAddProperty }) => {
	const [newProperty, setNewProperty] = useState({
		title: '',
		description: '',
		image: '',
		contact: '',
		price: '',
		type: ''
	});

	const handleAddProperty = () => {
		// Submit a new property
		axios.post('http://localhost:3001/api/properties', newProperty)
			.then(response => {
				// Notify the parent component about the new property
				onAddProperty(response.data);

				// Clear the newProperty state for the next entry
				setNewProperty({
					title: '',
					description: '',
					image: '',
					contact: '',
					price: '',
					type: ''
				});
			})
			.catch(error => console.error(error));
	};

	return (
		<div>
			<h2 style={{ "color": "#007BFF" }}>
				Add a New Property
			</h2>
			<form onSubmit={(e) => {
				e.preventDefault();
				handleAddProperty();
			}}>
				<div className="form-row">
					<label>Title:
						<input type="text"
							value={newProperty.title}
							onChange={(e) =>
								setNewProperty(
									{
										...newProperty,
										title: e.target.value
									})}
							required />
					</label>
					<label>Description:
						<input type="text"
							value={newProperty.description}
							onChange={
								(e) =>
									setNewProperty(
										{
											...newProperty,
											description: e.target.value
										})} required />
					</label>
				</div>
				<div className="form-row">
					<label>Image URL:
						<input type="text"
							value={newProperty.image}
							onChange={
								(e) =>
									setNewProperty(
										{
											...newProperty,
											image: e.target.value
										})} required />
					</label>
					<label>Contact: <input type="text"
						value={newProperty.contact}
						onChange={
							(e) => setNewProperty(
								{
									...newProperty,
									contact: e.target.value
								})} required />
					</label>
				</div>
				<div className="form-row">
					<label>Price:
						<input type="number"
							value={newProperty.price}
							onChange={(e) =>
								setNewProperty(
									{
										...newProperty,
										price: e.target.value
									})}
							required />
					</label>
					<label>Type:
						<select
							value={newProperty.type}
							onChange={(e) =>
								setNewProperty(
									{
										...newProperty,
										type: e.target.value
									})}
							required>
							<option value="">Select Type</option>
							<option value="Apartment">Apartment</option>
							<option value="Villa">Villa</option>
							<option value="Townhouse">Townhouse</option>
							<option value="Cottage">Cottage</option>
							<option value="Bungalow">Bungalow</option>
						</select>
					</label>
				</div>
				<button type="submit"
					style={{ backgroundColor: "blue" }}>
					Add Property
				</button>
			</form>
		</div>
	);
};

export default AddProperty;
