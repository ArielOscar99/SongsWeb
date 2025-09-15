import { Song, addSong as addSongRepo, getAllSongs as getAllSongsRepo, deleteSong as deleteSongRepo, searchSongs as searchSongsRepo } from "../repositories/songRepository";
import csv from "csv-parser";
import fs from "fs";

/**
 * Get all songs
 */
export const getAllSongs = async (): Promise<Song[]> => {
  return await getAllSongsRepo();
};

/**
 * Add a single song
 */
export const addSong = async (name: string, band: string, year: number): Promise<Song> => {
  return await addSongRepo(name, band, year);
};

/**
 * Delete a song
 */
export const deleteSong = async (id: number): Promise<void> => {
  await deleteSongRepo(id);
};

/**
 * Search songs
 */
export const searchSongs = async (query: string): Promise<Song[]> => {
  return await searchSongsRepo(query);
};

/**
 * Add multiple songs from CSV file
 */
export const addSongsFromCSV = async (filePath: string): Promise<Song[]> => {
  return new Promise((resolve, reject) => {
    const songs: Song[] = [];
    fs.createReadStream(filePath)
      .pipe(csv()) // expects columns: name,band,year
      .on("data", (row) => {
        // lowercase transformation
        const name = row.name.toLowerCase();
        const band = row.band.toLowerCase();
        const year = Number(row.year);
        songs.push({ id: 0, name, band, year });
      })
      .on("end", async () => {
        try {
          const addedSongs: Song[] = [];
          for (const song of songs) {
            const added = await addSongRepo(song.name, song.band, song.year);
            addedSongs.push(added);
          }
          resolve(addedSongs);
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
