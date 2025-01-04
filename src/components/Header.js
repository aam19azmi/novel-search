import Link from "next/link";

import dynamic from "next/dynamic";
import SearchBar from "./SearchBar";

const GenreSelect = dynamic(() => import("./GenreSelect"), { ssr: false });

export default function Header({ searchQuery, setSearchQuery, selectedGenre, setSelectedGenre }) {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between mb-6">
      <Link href="/" onClick={() => setSearchQuery("")}>
        <h1 className="text-2xl font-bold text-blue mb-4 md:mb-0 cursor-pointer">
          Novel Search
        </h1>
      </Link>
      <div className="flex items-center gap-4 mb-2">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="flex items-center gap-4">
        <GenreSelect selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      </div>
    </header>
  );
}
