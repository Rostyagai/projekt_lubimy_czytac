import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Details() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Pobieranie referencji do konkretnego dokumentu
        const docRef = doc(db, "books", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBook({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p className="container">Ładowanie danych...</p>;

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
      <div className="container">
        <Link to="/" className="book-details__back">
          ← Powrót do listy
        </Link>

        <div className="book-details__card">
          <div className="book-details__grid">
            {/* Sekcja wizualna: Okładka lub Placeholder */}
            <div className="book-details__visual">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="book-details__image"
                />
              ) : (
                <div className="book-details__placeholder">
                  <span>Brak okładki</span>
                </div>
              )}
            </div>

            {/* Sekcja tekstowa: Dane o książce */}
            <div className="book-details__info">
              <h1 className="book-details__title">{book.title}</h1>
              <p className="book-details__author">
                Autor: <strong>{book.author}</strong>
              </p>

              <div className="book-details__meta">
                <p>
                  <span>Gatunek:</span> {book.genre}
                </p>
                <p>
                  <span>ID Studenta:</span> {book.studentId}
                </p>
                <p>
                  <span>Dodano:</span>{" "}
                  {book.createdAt?.toDate().toLocaleDateString()}
                </p>
              </div>

              <hr className="book-details__divider" />

              <div className="book-details__content">
                <h3>Opis książki:</h3>
                <p>
                  {book.description || "Ta książka nie posiada jeszcze opisu."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Details;
