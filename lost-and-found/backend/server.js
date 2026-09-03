const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "items.json");

app.use(cors());
app.use(express.json());

// helper functions to read/write the json "database"
function readItems() {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data || "[]");
}

function writeItems(items) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
}

// GET all items (with optional type and search filter)
app.get("/api/items", (req, res) => {
  let items = readItems();
  const { type, search } = req.query;

  if (type && type !== "all") {
    items = items.filter((item) => item.type === type);
  }

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
    );
  }

  items.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(items);
});

// GET single item
app.get("/api/items/:id", (req, res) => {
  const items = readItems();
  const item = items.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

// POST a new item (lost or found)
app.post("/api/items", (req, res) => {
  const { type, title, description, location, contact } = req.body;

  if (!type || !title || !description || !location || !contact) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const items = readItems();

  const newItem = {
    id: Date.now().toString(),
    type, // "lost" or "found"
    title,
    description,
    location,
    contact,
    date: new Date().toISOString(),
    resolved: false,
  };

  items.push(newItem);
  writeItems(items);

  res.status(201).json(newItem);
});

// PATCH - mark an item as resolved / returned
app.patch("/api/items/:id/resolve", (req, res) => {
  const items = readItems();
  const item = items.find((i) => i.id === req.params.id);

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.resolved = true;
  writeItems(items);

  res.json(item);
});

// DELETE an item
app.delete("/api/items/:id", (req, res) => {
  let items = readItems();
  const exists = items.some((i) => i.id === req.params.id);

  if (!exists) return res.status(404).json({ message: "Item not found" });

  items = items.filter((i) => i.id !== req.params.id);
  writeItems(items);

  res.json({ message: "Item deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
