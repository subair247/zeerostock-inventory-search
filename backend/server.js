const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// FIXED: Looking one folder up (..) to find the frontend folder
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Mock data
const inventory = [
    { id: 1, productName: "Ergonomic Chair", category: "Furniture", price: 120 },
    { id: 2, productName: "Wireless Mouse", category: "Electronics", price: 25 },
    { id: 3, productName: "Mechanical Keyboard", category: "Electronics", price: 75 }
];

// Search API
app.get('/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : "";
    const results = inventory.filter(item => 
        item.productName.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    res.json(results);
});

// Home route to show the UI - UPDATED for Express v5
app.get('(.*)', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});