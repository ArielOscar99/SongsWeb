import express from "express";
import multer from "multer";
import * as songController from "../controllers/songController";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp folder for CSV files

// Routes
router.get("/", songController.getAllSongs);
router.post("/", songController.addSong);
router.delete("/:id", songController.deleteSong);
router.get("/search", songController.searchSongs);
router.post("/csv", upload.single("file"), songController.addSongsFromCSV);

export default router;
