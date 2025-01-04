"use client";

import { useState, useMemo } from "react";
import Header from "./Header";
import Results from "./Results";
import Modal from "./Modal";

export default function ClientContent({ novels }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 10; // Number of items per page

  const filteredNovels = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return novels.filter((novel) => {
      const novelGenres = novel.genre.split(",").map((g) => g.trim().toLowerCase());
      const selectedGenres = selectedGenre.map((g) => g.value.toLowerCase());

      // Check if the novel matches all selected genres
      const genreMatches =
        selectedGenres.length === 0 || selectedGenres.every((g) => novelGenres.includes(g));

      // Check if the query matches the title or author
      const queryMatches =
        novel.title.toLowerCase().includes(query) || novel.author.toLowerCase().includes(query);

      // Include the novel only if both conditions are true
      return genreMatches && queryMatches;
    });
  }, [searchQuery, selectedGenre, novels]);

  const paginatedNovels = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredNovels.slice(startIndex, endIndex);
  }, [filteredNovels, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredNovels.length / itemsPerPage);

  const openModal = (novel) => {
    setSelectedNovel(novel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNovel(null);
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <Results
        results={paginatedNovels}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        openModal={openModal}
      />
      {isModalOpen && (
        <Modal
          novel={selectedNovel}
          onClose={closeModal}
        />
      )}
    </>
  );
}
