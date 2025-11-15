const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

// Root test route
app.get("/", (req, res) => {
  res.send("Catalog Proxy Online!");
});

// Catalog search
app.get("/catalog", async (req, res) => {
  try {
    const roblox = await axios.get(
      "https://catalog.roblox.com/v1/search/items/details",
      { params: req.query }
    );
    res.json(roblox.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// *** NEW *** Item details endpoint
app.get("/details", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: "Missing ?id=" });

    const roblox = await axios.get(
      "https://catalog.roblox.com/v1/catalog/items/details",
      {
        params: {
          items: JSON.stringify([
            { itemType: "Asset", id: Number(id) }
          ])
        }
      }
    );

    res.json(roblox.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
