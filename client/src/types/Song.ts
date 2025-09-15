/**
 * Represents a song type in the list that is used across the fronted
 * Definition of the structure for song
 */
export interface Song {
    /** 
   * Unique identifier for the song
   * Used as primary key in list components and API responses
   */
    id: number;

    /** 
   * The title/name of the song
   * Should contain the official song title as released
   */
    name: string;

    /** 
   * The name of the band/artist who performed the song
   * Can be a solo artist name or band name
   */
    band: string;

    /** 
   * The year the song was released
   * Should be a 4-digit year (e.g., 2023, 1985)
   */
    year: number;
}
