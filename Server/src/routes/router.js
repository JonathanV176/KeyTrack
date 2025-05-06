const express = require('express');
const router = express.Router();

// Mock database for properties
let properties = [];

// Route to handle adding a new property
router.post('/api/properties', (req, res) => {
    const newProperty = req.body;
    newProperty._id = properties.length + 1; // Mock ID generation
    properties.push(newProperty);
    res.status(201).json(newProperty);
});

// Route to get all properties
router.get('/api/properties', (req, res) => {
    res.json(properties);
});

// Route to delete a property by ID
router.delete('/api/properties/:id', (req, res) => {
    const propertyId = parseInt(req.params.id, 10);
    properties = properties.filter(property => property._id !== propertyId);
    res.status(200).json({ message: 'Property deleted successfully' });
});

module.exports = router;