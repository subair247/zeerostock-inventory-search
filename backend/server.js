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
  { id: 3, productName: "Mechanical Keyboard", category: "Electronics", price: 75 }
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