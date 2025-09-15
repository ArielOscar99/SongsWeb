import pool from "../config/db";

// Song type
export interface Song {
  id: number;
  name: string;
  band: string;
  year: number;
}

/**
 * Get all songs ordered by band name
 */
export const getAllSongs = async (): Promise<Song[]> => {
  try {
    const res = await pool.query("SELECT * FROM songs ORDER BY LOWER(band) ASC");
    return res.rows;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw new Error("Could not fetch songs from database");
  }
};

/**
 * Add one song
 */
export const addSong = async (name: string, band: string, year: number): Promise<Song> => {
  try {
    const res = await pool.query(
      "INSERT INTO songs (name, band, year) VALUES ($1, $2, $3) RETURNING *",
      [name.toLowerCase(), band.toLowerCase(), year]
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

/**
 * Search songs by name or band (partial match)
 */
export const searchSongs = async (query: string): Promise<Song[]> => {
  try {
    const lowerQuery = query.toLowerCase();
    const res = await pool.query(
      "SELECT * FROM songs WHERE LOWER(name) LIKE $1 OR LOWER(band) LIKE $1 ORDER BY LOWER(band) ASC",
      [`%${lowerQuery}%`]
    );
    return res.rows;
  } catch (error) {
    console.error("Error searching songs:", error);
    throw new Error("Could not search songs in database");
  }
};
