
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import chatRoutes from "./src/routes/chat.route.js";

import { connectDB } from "./src/lib/db.js";

const app = express();
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

// ✅ CORS middleware
app.use(
  cors({
    origin: ["https://zoomfend.degefagomora.com", "http://localhost:5173"],
    credentials: true,
  })
);

// ✅ Handle preflight CORS
app.options("*", cors({
  origin: ["https://zoomfend.degefagomora.com", "http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Root health check (important for Passenger or installation check)
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send("<h1>Zoom App Backend is running ✅</h1>");
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Production static file serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  connectDB();
});
