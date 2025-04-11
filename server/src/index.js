import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import doeRouter from "./routes/doe.routes.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/auth", userRouter);
app.use("/doe", doeRouter);


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
