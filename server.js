const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Catalog Proxy Online!");
});

app.get("/catalog", async (req, res) => {
  try {
    const roblox = await axios.get("https://catalog.roblox.com/v1/search/items/details", {
      params: req.query
    });
    res.json(roblox.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
