import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database pool setup
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// POST /reviews: Add a new review
app.post("/reviews", async (req, res) => {
  const { reviewer, hotel, city, content, star } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO reviews (reviewer, hotel, city, content, star) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [reviewer, hotel, city, content, star]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Failed to add review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
});

// GET /reviews: Fetch all reviews
app.get("/reviews", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM reviews ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

// Root endpoint test
app.get("/", (req, res) => {
  res.json("This is the root endpoint test");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
