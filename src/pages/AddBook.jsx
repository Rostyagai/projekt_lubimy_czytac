import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function AddBook() {
  // Stan formularza - trzymamy wszystkie dane w jednym obiekcie
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    studentId: "",
    genre: "",
    desc: "",
    coverUrl: "", // Nowe pole na link do okładki
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // Funkcja walidująca poszczególne pola
  const validate = (name, value) => {
    let error = "";
    if (name === "title" && value.length < 2)
      error = "Tytuł musi mieć min. 2 znaki";
    if (name === "author" && value.length < 3)
      error = "Autor musi mieć min. 3 znaki";
    if (name === "studentId" && !/^\d+$/.test(value))
      error = "ID musi być liczbą";
    if (name === "genre" && !value) error = "Wybierz gatunek";
    // Opcjonalna walidacja URL okładki
    if (name === "coverUrl" && value && !value.startsWith("http"))
      error = "Link musi zaczynać się od http";

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Obsługa zmiany wartości w polach input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  // useEffect sprawdza poprawność całej formy przy każdej zmianie
  useEffect(() => {
    const hasErrors = Object.values(errors).some((err) => err !== "");
    const allRequiredFilled =
      formData.title && formData.author && formData.studentId && formData.genre;
    setIsFormValid(!hasErrors && allRequiredFilled);
  }, [errors, formData]);

  // Wysłanie danych do Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      await addDoc(collection(db, "books"), {
        title: formData.title,
        author: formData.author,
        description: formData.desc,
        studentId: formData.studentId,
        genre: formData.genre,
        coverUrl: formData.coverUrl || "https://via.placeholder.com/150", // Domyślny obrazek jeśli brak linku
        createdAt: serverTimestamp(),
      });
      alert("Książka została dodana!");
      navigate("/");
    } catch (error) {
      console.error("Błąd podczas dodawania:", error);
      alert("Wystąpił błąd!");
    }
  };

  return (
    <section className="form-section">
      <h1 className="form-section__title">Dodaj nową książkę</h1>
      <form className="form" onSubmit={handleSubmit}>
        {/* Pole: Tytuł */}
        <div className="form__group">
          <label className="form__label">Tytuł</label>
          <input
            name="title"
            className={`form__input ${
              errors.title ? "form__input--error" : ""
            }`}
            value={formData.title}
            onChange={handleChange}
            placeholder="np. Wiedźmin"
          />
          {errors.title && (
            <span className="form__error-msg">{errors.title}</span>
          )}
        </div>

        {/* Pole: Autor */}
        <div className="form__group">
          <label className="form__label">Autor</label>
          <input
            name="author"
            className={`form__input ${
              errors.author ? "form__input--error" : ""
            }`}
            value={formData.author}
            onChange={handleChange}
          />
          {errors.author && (
            <span className="form__error-msg">{errors.author}</span>
          )}
        </div>

        {/* Pole: Link do okładki */}
        <div className="form__group">
          <label className="form__label">Link do okładki (URL)</label>
          <input
            name="coverUrl"
            className={`form__input ${
              errors.coverUrl ? "form__input--error" : ""
            }`}
            value={formData.coverUrl}
            onChange={handleChange}
            placeholder="https://link-do-obrazka.jpg"
          />
          {errors.coverUrl && (
            <span className="form__error-msg">{errors.coverUrl}</span>
          )}
        </div>

        {/* Pole: ID Studenta */}
        <div className="form__group">
          <label className="form__label">ID Studenta</label>
          <input
            name="studentId"
            className={`form__input ${
              errors.studentId ? "form__input--error" : ""
            }`}
            value={formData.studentId}
            onChange={handleChange}
          />
          {errors.studentId && (
            <span className="form__error-msg">{errors.studentId}</span>
          )}
        </div>

        {/* Pole: Gatunek */}
        <div className="form__group">
          <label className="form__label">Gatunek</label>
          <select
            name="genre"
            className={`form__input ${
              errors.genre ? "form__input--error" : ""
            }`}
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">Wybierz gatunek</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Dramat">Dramat</option>
            <option value="Nauka">Nauka</option>
          </select>
          {errors.genre && (
            <span className="form__error-msg">{errors.genre}</span>
          )}
        </div>

        {/* Pole: Opis */}
        <div className="form__group">
          <label className="form__label">Opis</label>
          <textarea
            name="desc"
            className="form__textarea"
            value={formData.desc}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" className="form__button" disabled={!isFormValid}>
          Zapisz książkę
        </button>
      </form>
    </section>
  );
}

export default AddBook;
