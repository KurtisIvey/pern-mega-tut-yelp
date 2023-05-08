require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3001;
const db = require("./db");

// middleware
app.use(express.json());
// retreive all
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants");
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: { restaurants: results.rows },
    });
  } catch (err) {
    console.log(err);
  }
});

// retrieve one
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: { restaurants: results.rows[0] },
    });
  } catch (err) {
    console.log(err);
  }
});

// create restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES($1,$2,$3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: { restaurants: results.rows },
    });
  } catch (err) {
    console.log(err);
  }
});

// update restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  res.status(201).json({
    status: "success",
    data: {
      restaurant: "mcdonalds",
    },
  });
});

// delete restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
