import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OmniBrain Gateway Service is operational",
    endpoints: [
      "/health",
      "/api/documents",
      "/api/documents/analyze",
      "/api/chat/stream"
    ]
  });
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "gateway-service" });
});

app.use("/api", routes);

export default app;