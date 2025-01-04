"use client";

import { useEffect, useState } from "react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
    const [debouncedValue, setDebouncedValue] = useState(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchQuery(debouncedValue);
        }, 300); // Debounce selama 300ms

        return () => clearTimeout(handler);
    }, [debouncedValue, setSearchQuery]);

    return (
        <div>
            <label htmlFor="search" className="sr-only">
                Cari Novel atau Author
            </label>
            <input
                id="search"
                type="text"
                placeholder="Cari Novel atau Author..."
                className="px-4 py-2 border rounded-full w-64 md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={debouncedValue}
                onChange={(e) => setDebouncedValue(e.target.value)}
            />
        </div>
    );
}
  
