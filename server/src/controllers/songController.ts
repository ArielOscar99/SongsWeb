import { Request, Response } from "express";
import * as songService from "../services/songService";

/**
 * Get all songs
 */
export const getAllSongs = async (req: Request, res: Response) => {
  try {
    const songs = await songService.getAllSongs();
    res.json(songs);
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add one song
 */
export const addSong = async (req: Request, res: Response) => {
  try {
    const { name, band, year } = req.body;
    if (!name || !band || !year) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const newSong = await songService.addSong(name, band, Number(year));
    res.status(201).json(newSong);
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a song
 */
export const deleteSong = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await songService.deleteSong(Number(id));
    res.status(204).send();
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Search songs
 */
export const searchSongs = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Query string required" });
    }
    const results = await songService.searchSongs(query);
    res.json(results);
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add songs from CSV
 */
export const addSongsFromCSV = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required" });
    }
    const addedSongs = await songService.addSongsFromCSV(req.file.path);
    res.status(201).json(addedSongs);
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};
