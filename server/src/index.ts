import express from "express";
import cors from "cors";
import songRoutes from "./routes/songRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/songs", songRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
