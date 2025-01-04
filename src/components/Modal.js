"use client";

import { useRef, useState } from "react";

export default function Modal({ novel, onClose }) {
  if (!novel) return null;

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200; // Max characters to display before truncating

  // Handler to detect clicks outside the modal content
  const modalRef = useRef();

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title-overlay"
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-screen-lg w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <button
          onClick={onClose}
          className="float-right text-gray-500 hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{novel.title}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Author:</strong> {novel.author}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Genre:</strong> {novel.genre}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Chapters:</strong> {novel.chapters}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Published:</strong> {novel.createdAt}
        </p>
        <div className="text-gray-700 mb-2 max-h-60 overflow-y-auto">
          <p>
            {novel.synopsis.length > maxLength && !isExpanded
              ? `${novel.synopsis.substring(0, maxLength)}...`
              : novel.synopsis}
            {novel.synopsis.length > maxLength && (
              <span
                className="text-blue-500 hover:underline ml-2 cursor-pointer"
                onClick={toggleExpanded}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap-reverse justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Close
          </button>
          <a
            href={novel.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Read
          </a>
        </div>
      </div>
    </div>
  );
}
