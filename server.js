app.get("/details", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: "Missing ?id=" });

    const itemsParam = JSON.stringify([
      {
        itemType: "Asset",
        id: Number(id)
      }
    ]);

    const roblox = await axios.get(
      "https://catalog.roblox.com/v1/catalog/items",
      {
        params: {
          items: itemsParam
        }
      }
    );

    res.json(roblox.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error);
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
});
