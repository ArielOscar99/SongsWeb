/**
 * AddCSVButton.tsx
 * Uploads a CSV file of songs and sends it to the server.
 * Shows a loading state while uploading.
 * Calls parent refresh function after successful upload.
 */

import React, { useState } from "react";
import api from "../../services/api";

interface AddCSVButtonProps {
    onSongsUploaded: () => void;
}

const AddCSVButton: React.FC<AddCSVButtonProps> = ({ onSongsUploaded }) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false); // Loading state

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    /**
     * Handles CSV upload to the server.
     */
    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        setLoading(true);

        try {
            await api.post("/songs/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFile(null);
            onSongsUploaded(); // Refresh parent
        } catch (error: any) {
            console.error("Error uploading CSV:", error.message);
            alert("Failed to upload CSV. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-csv">
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!file || loading}>
                {loading ? "Uploading..." : "Upload CSV"}
            </button>
        </div>
    );
};

export default AddCSVButton;
