// Server Component

import ClientContent from "@/components/ClientContent";

export async function generateMetadata() {
  let novels = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/novels`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch novels: ${res.status} ${res.statusText}`);
    }

    novels = await res.json();
  } catch (error) {
    console.error("Error fetching novels data:", error);
  }

  // Sort novels by creation date (most recent first)
  novels = novels.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Ensure authors are strings
  novels = novels.map((novel) => ({
    ...novel,
    author: Array.isArray(novel.author) ? novel.author.join(", ") : novel.author,
  }));

  // Generate JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": novels.map((novel, index) => ({
      "@type": "Book",
      "position": index + 1,
      "name": novel.title,
      "author": {
        "@type": "Person",
        "name": novel.author,
      },
      "genre": novel.genre,
      "numberOfPages": novel.chapters,
      "datePublished": novel.createdAt,
      "description": novel.synopsis,
      "url": novel.link,
    })),
  };

  return {
    title: "Novel Search",
    description: "Discover the latest and most popular novels.",
    other: {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(structuredData) },
    },
  };
}

export default async function Home() {
  let novels = [];

  try {
    const res = await fetch(`/api/novels`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch novels: ${res.status} ${res.statusText}`);
    }

    novels = await res.json();
  } catch (error) {
    console.error("Error fetching novels data:", error);
  }

  // Sort novels by creation date (most recent first)
  novels = novels.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Ensure authors are strings
  novels = novels.map((novel) => ({
    ...novel,
    author: Array.isArray(novel.author) ? novel.author.join(", ") : novel.author,
  }));

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <ClientContent novels={novels} />
    </main>
  );
}
