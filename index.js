import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json({ message: "Pagnottella Gourmet Delivery online!", result: result.rows });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
