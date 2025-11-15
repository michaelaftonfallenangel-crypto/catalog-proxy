const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Basic test endpoint
app.get("/", (req, res) => {
  res.send("Catalog Proxy Online!");
});

// Search endpoint
app.get("/catalog", async (req, res) => {
  try {
    const roblox = await axios.get(
      "https://catalog.roblox.com/v1/search/items/details",
      { params: req.query }
    );
    res.json(roblox.data);
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// Item details endpoint
app.get("/details", async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ error: "Missing id parameter" });
    }

    const roblox = await axios.get(
      `https://economy.roblox.com/v2/assets/${id}/details`
    );

    res.json(roblox.data);

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
