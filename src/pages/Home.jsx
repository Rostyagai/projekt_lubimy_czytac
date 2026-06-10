import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dailyBook, setDailyBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBooks(booksData);

        if (booksData.length > 0) {
          const sortedBooks = [...booksData].sort((a, b) =>
            a.id.localeCompare(b.id)
          );

          const today = new Date();
          const dateSeed =
            today.getFullYear() * 10000 +
            (today.getMonth() + 1) * 100 +
            today.getDate();

          const dailyIndex = dateSeed % sortedBooks.length;
          setDailyBook(sortedBooks[dailyIndex]);
        }
      } catch (error) {
        console.error("BŁĄD PODCZAS POBIERANIA: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const totalBooks = books.length;
  const uniqueGenres = [...new Set(books.map((book) => book.genre))].filter(
    Boolean
  ).length;
  const uniqueAuthors = [...new Set(books.map((book) => book.author))].length;

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="container">Ładowanie danych...</p>;

  return (
    <section>
      <div className="hero">
        <h1 className="hero__title">Moja Biblioteka</h1>
        <p>Kolekcja książek zsynchronizowana z bazą danych Firebase.</p>
      </div>

      <div className="stats-section">
        <div className="container">
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-card__number">{totalBooks}</span>
              <span className="stat-card__label">Książek w bazie</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__number">{uniqueAuthors}</span>
              <span className="stat-card__label">Autorów</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__number">{uniqueGenres}</span>
              <span className="stat-card__label">Gatunków</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="quote-banner">
          <p className="quote-text">"Kto czyta książki, żyje podwójnie."</p>
          <span className="quote-author">— Umberto Eco</span>
        </div>

        {dailyBook && (
          <div className="daily-book-section">
            <div className="container">
              <div className="daily-book-card">
                <div className="daily-book__image-wrapper">
                  {dailyBook.coverUrl ? (
                    <img
                      src={dailyBook.coverUrl}
                      alt={dailyBook.title}
                      className="daily-book__image"
                    />
                  ) : (
                    <div className="daily-book__placeholder">
                      <span>Brak okładki</span>
                    </div>
                  )}
                </div>
                <div className="daily-book__content">
                  <h2 className="daily-book__title">{dailyBook.title}</h2>
                  <p className="daily-book__author">
                    Autor: {dailyBook.author}
                  </p>
                  {dailyBook.genre && (
                    <span className="daily-book__genre-tag">
                      {dailyBook.genre}
                    </span>
                  )}
                  <p className="daily-book__description">
                    {dailyBook.description ||
                      "Ta wyjątkowa pozycja została wybrana jako nasza dzisiejsza rekomendacja. Zapraszamy do lektury!"}
                  </p>
                  <Link
                    to={`/book/${dailyBook.id}`}
                    className="daily-book__link"
                  >
                    Zobacz szczegóły dnia
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <h1 className="search__title">Wyszukiwarka</h1>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Szukaj po tytule książki..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>

        <div className="book-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <article key={book.id} className="book-card">
                <div className="book-card__cover-wrapper">
                  {book.coverUrl ? (
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="book-card__image"
                    />
                  ) : (
                    <div className="book-card__placeholder">
                      <span>Brak okładki</span>
                    </div>
                  )}
                </div>

                <div className="book-card__content">
                  <h2 className="book-card__title">{book.title}</h2>
                  <p className="book-card__author">Autor: {book.author}</p>
                  {book.genre && (
                    <p className="book-card__genre-tag">{book.genre}</p>
                  )}

                  <div style={{ marginTop: "20px" }}>
                    <Link to={`/book/${book.id}`} className="book-card__link">
                      Zobacz szczegóły
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>
              {searchQuery
                ? "Nie znaleziono książek pasujących do wyszukiwania."
                : "Brak dostępnych książek w bazie danych."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
