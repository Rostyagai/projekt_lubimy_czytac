import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { id: Date.now(), title, author, description: desc };

    const books = JSON.parse(localStorage.getItem("books")) || [];
    localStorage.setItem("books", JSON.stringify([...books, newBook]));

    alert("Dodano książkę!");
    navigate("/"); // Повертаємось на головну
  };

  return (
    <section className="form-section">
      <h1 className="form-section__title">Dodaj nową książkę</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Tytuł</label>
          <input
            className="form__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form__group">
          <label className="form__label">Autor</label>
          <input
            className="form__input"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form__group">
          <label className="form__label">Opis</label>
          <textarea
            className="form__textarea"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows="5"
          />
        </div>
        <button type="submit" class="form__button">
          Zapisz książkę
        </button>
      </form>
    </section>
  );
}

export default AddBook;
