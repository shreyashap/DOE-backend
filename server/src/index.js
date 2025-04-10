import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';
const { Pool } = pg;

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

app.post("/auth/user/sign-up", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(402).json({
      error: "All fields are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users ("firstName","lastName", "email", "password") VALUES ($1, $2, $3,$4) RETURNING id, email',
      [firstName, lastName, email, hashedPassword]
    );

    res
      .status(201)
      .json({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    if (err.code === "23505")
      return res.status(400).json({ message: "Email already in use" });
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/auth/user/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    return res.status(402).json({
      message: "All fields are required",
    });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0)
      return res.status(400).json({ message: "Invalid credentials" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/doe", verifyToken, async (req, res) => {
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

app.post("/auth/verify-token", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    return res
      .status(401)
      .json({ valid: false, message: "Invalid or expired token" });
  }
});

app.get("/doe/search/suggestions/", verifyToken, async (req, res) => {
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

app.get("/doe/:serialNumber", verifyToken, async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
