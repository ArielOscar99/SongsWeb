/**
 * SearchBar.tsx
 * A search input with a button.
 * Sends the search term back to the parent (App) when submitted.
 */

import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [term, setTerm] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(term.trim().toLowerCase()); // normalize to lowercase
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                placeholder="Search songs or bands..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
