/**
 * SongItem.tsx
 * Represents a single row in the songs table.
 * Wrapped with React.memo to prevent unnecessary re-renders
 * if the song props do not change.
 */

import React from "react";
import { Song } from "../../types/Song";

interface SongItemProps {
    song: Song;
    onDelete: (id: number) => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, onDelete }) => {
    return (
        <tr>
            <td>{song.name}</td>
            <td>{song.band}</td>
            <td>{song.year}</td>
            <td>
                <button onClick={() => onDelete(song.id)}>Delete</button>
            </td>
        </tr>
    );
};

// React.memo ensures this component only re-renders when props change
export default React.memo(SongItem);
