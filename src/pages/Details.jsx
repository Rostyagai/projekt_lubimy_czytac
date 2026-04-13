import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Details() {
  // useParams витягує :id з URL (наприклад, з /book/17103456)
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Отримуємо всі книги
    const books = JSON.parse(localStorage.getItem("books")) || [];
    // Шукаємо ту саму за ID
    const foundBook = books.find((b) => b.id.toString() === id.toString());
    setBook(foundBook);
  }, [id]);

  if (!book) {
    return (
      <div className="container">
        <h2>Książka nie została znaleziona!</h2>
        <Link to="/" className="book-details__back">
          ← Powrót do listy
        </Link>
      </div>
    );
  }

  return (
    <article className="book-details">
      <Link to="/" className="book-details__back">
        ← Powrót do listy
      </Link>

      <div className="book-details__card">
        <h1 className="book-details__title">{book.title}</h1>
        <p className="book-details__author">Autor: {book.author}</p>

        <hr className="book-details__divider" />

        <div className="book-details__content">
          <h3>Opis książki:</h3>
          <p>{book.description || "Brak opisu dla tej książki."}</p>
        </div>
      </div>
    </article>
  );
}

export default Details;
