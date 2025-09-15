/**
 * songRepository.ts
 * 
 * Handles direct SQL queries for the `songs` table.
 * Contains methods to get, add, delete songs.
 */

import pool from "../config/db";

// TypeScript type for a Song
export interface Song {
  id: number;
  name: string;
  band: string;
  year: number;
}

/**
 * Get all songs from the DB
 */
export const getAllSongs = async (): Promise<Song[]> => {
  try {
    const res = await pool.query("SELECT * FROM songs ORDER BY id ASC");
    return res.rows;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw new Error("Could not fetch songs from database");
  }
};

/**
 * Add a new song
 */
export const addSong = async (name: string, band: string, year: number): Promise<Song> => {
  try {
    const res = await pool.query(
      "INSERT INTO songs (name, band, year) VALUES ($1, $2, $3) RETURNING *",
      [name, band, year]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error adding song:", error);
    throw new Error("Could not add song to database");
  }
};

/**
 * Delete a song by ID
 */
export const deleteSong = async (id: number): Promise<void> => {
  try {
    await pool.query("DELETE FROM songs WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting song:", error);
    throw new Error("Could not delete song from database");
  }
};
