/**
 * AddSongButton.tsx
 * Provides a form for adding a single song.
 * Shows a loading state while sending data to the server.
 * Calls parent refresh function after successful addition.
 */

import React, { useState } from "react";
import api from "../../services/api";

interface AddSongButtonProps {
  onSongAdded: () => void;
}

const AddSongButton: React.FC<AddSongButtonProps> = ({ onSongAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [band, setBand] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [loading, setLoading] = useState(false); // Loading state

  /**
   * Handles form submission to add a single song.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/songs", { name, band, year });
      setName("");
      setBand("");
      setYear("");
      setShowForm(false);
      onSongAdded(); // Refresh parent
    } catch (error: any) {
      console.error("Error adding song:", error.message);
      alert("Failed to add song. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-song">
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Song"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="song-form">
          <input
            type="text"
            placeholder="Song name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Band name"
            value={band}
            onChange={(e) => setBand(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Save"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddSongButton;
