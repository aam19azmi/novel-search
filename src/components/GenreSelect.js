"use client";

import Select from "react-select";
import { useEffect, useState } from "react";

export default function GenreSelect({ selectedGenre, setSelectedGenre }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch("/api/genres");
        if (!res.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await res.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <Select
      options={genres}
      value={selectedGenre}
      onChange={setSelectedGenre}
      placeholder="Select Genre"
      isClearable
      isMulti
      className="w-48"
    />
  );
}
