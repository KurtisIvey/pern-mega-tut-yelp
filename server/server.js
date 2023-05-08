require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3001;
const db = require("./db");

// middleware
app.use(express.json());
app.use(cors());
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
    res.status(201).json({
      status: "success",
      results: results.rows.length,
      data: { restaurants: results.rows[0] },
    });
  } catch (err) {
    console.log(err);
  }
});

// update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(201).json({
      status: "success",
      results: results.rows.length,
      data: { restaurants: results.rows[0] },
    });
  } catch (err) {
    console.log(err);
  }
});

// delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE from restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(201).json({
      status: "success",
      message: "delete successful",
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
