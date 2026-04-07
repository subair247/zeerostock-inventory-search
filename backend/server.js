const express = require('express');
const cors = require('cors');
const inventory = require('./data/inventory.json'); 

const app = express();
app.use(cors()); 

app.get('/search', (req, res) => {
    let { q, category, minPrice, maxPrice } = req.query;
    let results = inventory;

    if (q) {
        results = results.filter(item => 
            item.productName.toLowerCase().includes(q.toLowerCase())
        );
    }

    if (category) {
        results = results.filter(item => item.category === category);
    }

    if (minPrice || maxPrice) {
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        
        if (min > max) {
            return res.status(400).json({ error: "minPrice cannot be greater than maxPrice" });
        }

        results = results.filter(item => item.price >= min && item.price <= max);
    }

    res.json(results);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));