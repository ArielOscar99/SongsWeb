/**
 * src/components/Pagination.tsx
 *
 * Simple pagination controls: previous / next.
 */

import React from "react";

interface Props {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<Props> = ({ page, totalPages, onPageChange }) => {
    return (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
            <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
                Back
            </button>
            <div style={{ alignSelf: "center" }}>
                {page} / {totalPages}
            </div>
            <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
