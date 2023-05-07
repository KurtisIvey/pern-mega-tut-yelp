require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

// retreive all
app.get("/api/v1/restaurants", (req, res) => {
  res
    .status(200)
    .json({ status: "success", data: { restaurants: ["mdonalds", "wendys"] } });
});
// retrieve one
app.get("/api/v1/restaurants/:id", (req, res) => {
  res.json({ id: req.params.id });
});
// create restaurant
app.post("/api/v1/restaurants/:id", (req, res) => {
  res.json({ status: "success", restaurant: "get all restaurants" });
});
// update restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  res.json({ status: "success", restaurant: "get all restaurants" });
});
// delete restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
  res.json({ status: "success", restaurant: "get all restaurants" });
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
