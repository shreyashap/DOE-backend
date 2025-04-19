import { pool } from "../db/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/").get(verifyToken, async (req, res) => {
  const { diameter } = req.query;

  try {
    const query = diameter
      ? `SELECT * FROM doe_data WHERE LOWER("Tool_Diameter"::text) ILIKE $1`
      : "SELECT * FROM doe_data";

    const value = `%${diameter?.toLowerCase()}%`;

    const result = diameter
      ? await pool.query(query, [value])
      : await pool.query(query);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.route("/search/suggestions").get(verifyToken, async (req, res) => {
  const { query } = req.query;

  if (!query) return res.json([]);

  try {
    const result = await pool.query(
      `SELECT DISTINCT "Tool_Diameter" FROM doe_data
       WHERE "Tool_Diameter"::text ILIKE $1
       ORDER BY "Tool_Diameter"
       LIMIT 5`,
      [`${query}%`]
    );

    if (!result) {
      return res.status(402).json({
        message: "No results found",
      });
    }

    res.json(result.rows.map((row) => row.Tool_Diameter));
  } catch (err) {
    console.error("Suggestion error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.route("/:serialNumber").get(verifyToken, async (req, res) => {
  const { serialNumber } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM "doe_data" WHERE "DOE_Serial_Number" = $1',
      [serialNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "DOE entry not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router
  .route("/filter/operation-description")
  .get(verifyToken, async (req, res) => {
    const { description } = req.query;

    if (!description) {
      return res.status(400).json({ error: "Missing operation description" });
    }

    try {
      const query = `
      SELECT * FROM doe_data 
      WHERE LOWER("Operation_Description") ILIKE $1
    `;

      const value = `%${description.toLowerCase()}%`;
      const result = await pool.query(query, [value]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No matching records found" });
      }

      res.json(result.rows);
    } catch (err) {
      console.error("Filter error:", err.message);
      res.status(500).send("Server error");
    }
  });

export default router;
