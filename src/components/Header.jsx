import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo">
          <b>Vistula</b> lubi czytać
        </Link>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link
                to="/"
                className={`nav__link ${
                  location.pathname === "/" ? "nav__link--active" : ""
                }`}
              >
                Wszystkie książki
              </Link>
            </li>
            <li className="nav__item">
              <Link
                to="/add"
                className={`nav__link ${
                  location.pathname === "/add" ? "nav__link--active" : ""
                }`}
              >
                Dodaj książkę
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
