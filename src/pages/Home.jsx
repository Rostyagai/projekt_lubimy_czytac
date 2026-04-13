import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(savedBooks);
  }, []);

  return (
    <section>
      <div className="hero">
        <h1 className="hero__title">Moja Biblioteka</h1>
        <p>Lista książek, które przeczytałem lub planuję.</p>
      </div>

      <div className="book-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <article key={book.id} className="book-card">
              <div className="book-card__content">
                <h2 className="book-card__title">{book.title}</h2>
                <p className="book-card__author">Autor: {book.author}</p>
                <Link to={`/book/${book.id}`} className="book-card__link">
                  Zobacz szczegóły
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p>Brak książek w bazie.</p>
        )}
      </div>
    </section>
  );
}

export default Home;
