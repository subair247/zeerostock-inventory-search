const express = require('express');
const cors = require('cors');
const inventory = require('./data/inventory.json'); 

const app = express();
const path = require('path');

// Step A: Serve the static files (CSS, JS, Images) from your frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Step B: Point the main URL (/) to your index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});
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