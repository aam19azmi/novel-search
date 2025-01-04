"use client";

export default function Results({ results, totalPages, currentPage, onPageChange, openModal }) {
  if (!results.length) {
    return <p className="text-center text-gray-500">No novels found.</p>;
  }

  const renderPagination = () => {
    const totalPagesToShow = 5;
    const pages = [];

    let startPage = Math.max(currentPage - Math.floor(totalPagesToShow / 2), 1);
    let endPage = startPage + totalPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - totalPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center mt-4 space-x-2">
        {startPage > 1 && (
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-800"
            onClick={() => onPageChange(1)}
          >
            First
          </button>
        )}

        {currentPage > 1 && (
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-800"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-800"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        )}

        {endPage < totalPages && (
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-800"
            onClick={() => onPageChange(totalPages)}
          >
            Last
          </button>
        )}
      </div>
    );
  };

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {results.map((novel, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 rounded hover:shadow-lg transition cursor-pointer"
            onClick={() => openModal(novel)} // Pass the novel to openModal
          >
            <h3 className="font-bold text-lg">{novel.title}</h3>
            <p className="text-gray-600">{novel.genre}</p>
            <p className="text-gray-500 text-sm">Published: {novel.createdAt}</p>
          </div>
        ))}
      </div>
      {renderPagination()}
    </section>
  );
}
