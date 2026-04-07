const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ===== CORRECT FRONTEND PATH =====
const frontendPath = path.join(__dirname, "..", "frontend");

// serve static files (HTML, CSS, JS)
app.use(express.static(frontendPath));

// ===== MOCK DATA =====
const inventory = [
  { id: 1, productName: "Ergonomic Chair", category: "Furniture", price: 120 },
  { id: 2, productName: "Wireless Mouse", category: "Electronics", price: 25 },
  { id: 3, productName: "Mechanical Keyboard", category: "Electronics", price: 75 },
  { id: 4, productName: "Office Desk", category: "Furniture", price: 250 },
    { id: 5, productName: "Monitor Stand", category: "Accessories", price: 45 },
    { id: 6, productName: "USB-C Hub", category: "Electronics", price: 35 },
    { id: 7, productName: "Table Lamp", category: "Furniture", price: 30 },
    { id: 8, productName: "Webcam 1080p", category: "Electronics", price: 60 },
    { id: 9, productName: "Noise Cancelling Headphones", category: "Electronics", price: 199 },
    { id: 10, productName: "Laptop Sleeve", category: "Accessories", price: 20 },
    { id: 11, productName: "Gaming Mouse Pad", category: "Accessories", price: 15 },
    { id: 12, productName: "Standing Desk Mat", category: "Furniture", price: 55 },
    { id: 13, productName: "Bluetooth Speaker", category: "Electronics", price: 85 },
    { id: 14, productName: "External Hard Drive", category: "Electronics", price: 110 },
    { id: 15, productName: "Wireless Charger", category: "Electronics", price: 25 }
];

// ===== API ROUTE =====
app.get("/search", (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : "";
  
  const results = inventory.filter(item =>
    item.productName.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query)
  );

  res.json(results);
});

// ===== ROOT ROUTE (IMPORTANT) =====
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ===== CATCH-ALL ROUTE (SAFE VERSION FOR EXPRESS v5) =====
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});