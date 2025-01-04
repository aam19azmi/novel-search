import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Novel Search | Discover Your Novel",
  description: "Search and explore your favorite novels by genre, author, or title.",
};

// Tambahkan viewport secara eksplisit
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl font-bold">Novel Search</h1>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2024 Novel Search</p>
        </footer>
      </body>
    </html>
  );
}
