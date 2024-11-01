//assets all installed and imported
//server currently running on port 8080 all working

import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// db pool url set up
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// post review
app.post("/reviews", async function (request, response) {
  const { reviewer, hotel, city, content, star } = request.body;
  console.log("New review submission:", {
    reviewer,
    hotel,
    city,
    content,
    star,
  });

  try {
    const result = await db.query(
      `INSERT INTO reviews (reviewer, hotel, city, content, star) 
       VALUES ('${reviewer}', '${hotel}', '${city}', '${content}', ${star})`
    );
    response.json(result);
  } catch (error) {
    console.error("Failed to add review:", error);
    response.status(500).json({ error: "Failed to add review" });
  }
});
/*All reviews*/
app.get("/reviews", async (req, res) => {
  const { hotel, city, star } = req.query;
  try {
    let query = `SELECT * FROM reviews WHERE 1=1`;
    const values = [];

    if (hotel) {
      query += ` AND hotel ILIKE $${values.length + 1}`;
      values.push(`%${hotel}%`);
    }
    if (city) {
      query += ` AND city ILIKE $${values.length + 1}`;
      values.push(`%${city}%`);
    }
    if (star) {
      query += ` AND star = $${values.length + 1}`;
      values.push(star);
    }

    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve reviews" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//test, runs fine
app.get("/", function (request, response) {
  response.json("this is the root test");
});

app.listen(8080, function () {
  console.log("app is running on port 8080");
});
