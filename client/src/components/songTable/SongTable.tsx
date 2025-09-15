/**
 * SongTable.tsx
 * Displays a table of songs, delegates rendering of each row to SongItem.
 * React.memo at SongItem level ensures only affected rows re-render.
 */

import React from "react";
import { Song } from "../../types/Song";
import SongItem from "./SongItem";

interface SongTableProps {
    songs: Song[];
    onDelete: (id: number) => void;
}

const SongTable: React.FC<SongTableProps> = ({ songs, onDelete }) => {
    return (
        <table className="songs-table">
            <thead>
                <tr>
                    <th>Song</th>
                    <th>Band</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {songs.map((song) => (
                    <SongItem key={song.id} song={song} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    );
};

export default SongTable;
