/**
 * App.tsx
 * Root component for the Songs app.
 * Handles state management (songs, pagination, search),
 * and coordinates rendering of subcomponents.
 */

import React, { useEffect, useState } from "react";
import api from "./services/api";
import { Song } from "./types/Song";
import SongTable from "./components/songTable/SongTable";
import SearchBar from "./components/header/SearchBar";
import AddSongButton from "./components/header/AddSongButton";
import AddCSVButton from "./components/header/AddCSVButton";
import Pagination from "./components/pagination/Pagination";

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch songs from server
  const fetchSongs = async () => {
    try {
      const res = await api.get<Song[]>("/songs", {
        params: { page, search: searchTerm },
      });
      setSongs(res.data);
    } catch (error: any) {
      console.error("Error fetching songs:", error.message);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [page, searchTerm]);

  // Delete song
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/songs/${id}`);
      fetchSongs();
    } catch (error: any) {
      console.error("Error deleting song:", error.message);
    }
  };

  return (
    <div className="app-container">
      {/* Header with search and buttons */}
      <header className="app-header">
        <SearchBar onSearch={setSearchTerm} />
        <div className="action-buttons">
          <AddSongButton onSongAdded={fetchSongs} />
          <AddCSVButton onSongsUploaded={fetchSongs} />
        </div>
      </header>

      {/* Table */}
      <SongTable songs={songs} onDelete={handleDelete} />

      {/* Pagination */}
      <Pagination page={page} onPageChange={setPage} />
    </div>
  );
};

export default App;
