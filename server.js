import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import chatHandler from "./api/chat.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Auralyn",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/chat", chatHandler);

app.use(express.static(path.join(currentDirectory, "public")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(currentDirectory, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Auralyn is running at http://localhost:${port}`);
});
