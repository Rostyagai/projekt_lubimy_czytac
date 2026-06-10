# 🇵🇱 Polska wersja
# 📚 Projekt: Lubimy Czytać – Advanced Web Platform
**Zrobiony przez studentów Akademii Finansów i Biznesu Vistula**
Kierunek: **Informatyka 1 rok, semestr letni**

**Lubimy Czytać** to profesjonalna platforma webowa do zarządzania kolekcją literatury, łącząca zaawansowaną logikę frontendową z chmurową bazą danych. Projekt został zaprojektowany zgodnie z najwyższymi standardami inżynierii oprogramowania, zapewniając szybkość, skalowalność i doskonały UX.

🚀 **Live Demo:** [https://projekt-lubimy-czytac.vercel.app/](https://projekt-lubimy-czytac.vercel.app/)

🔗 **Repozytorium:** [https://github.com/Rostyagai/projekt_lubimy_czytac](https://github.com/Rostyagai/projekt_lubimy_czytac)

---

## 👥 Zespół Projektowy i Synergia Kompetencji

Projekt jest efektem ścisłej współpracy, gdzie każdy aspekt został dopracowany przez dedykowanego specjalistę:

| Deweloper | Rola Techniczna | Kluczowy Wkład |
| :--- | :--- | :--- |
| **Oleksandr Rostiahai** | **Lead Developer** | Architektura systemu, zaawansowana logika React (Hooks, State Management), integracja z Firebase SDK, routing oraz implementacja algorytmów filtrowania i wdrożenie na platformę Vercel. |
| **Kira Khrypko** | **UI/UX Designer & DB Architect** | Kompletna koncepcja wizualna (UI), optymalizacja doświadczeń użytkownika (UX), design sekcji oraz **80% architektury bazy danych Firestore** (modelowanie struktur danych i zarządzanie kolekcjami). |

---

## 🛠️ Stack Technologiczny (Industrial Standard)

*   **Frontend:** ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) – komponenty funkcyjne i zaawansowane hooki.
*   **Build Tool:** ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) – zapewniający błyskawiczne ładowanie i optymalizację assetów.
*   **Backend & DB:** ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) – Cloud Firestore jako skalowalna baza danych NoSQL.
*   **Deployment:** ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) – profesjonalny hosting z automatycznym CI/CD.
*   **Styling:** ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) z pełną implementacją metodologii **BEM**.

---

## 🧠 Analiza Inteligentnych Rozwiązań

### 1. Deterministyczny Algorytm "Książki Dnia"
Zaimplementowaliśmy unikalny mechanizm rekomendacji oparty na **ziarnie daty (date seeding)**. Zamiast zwykłego losowania, algorytm oblicza indeks na podstawie aktualnego dnia:
```javascript
const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
const dailyIndex = dateSeed % sortedBooks.length;
```

Zaleta: Gwarantuje to, że wszyscy użytkownicy widzą tę samą "Książkę Dnia", co buduje wspólne doświadczenie użytkowników bez potrzeby backendowych skryptów typu Cron.

## 2. Architektura Danych i Wydajność (O-Notation)

Dzięki przemyślanej strukturze bazy danych, za którą odpowiadała **Kira Hrypko**, aplikacja wykonuje agregację statystyk w czasie rzeczywistym bezpośrednio na front-endzie. Wykorzystanie struktury `new Set()` przy obliczaniu unikalnych autorów i gatunków pozwala na zachowanie złożoności obliczeniowej **O(n)**:

```javascript
const uniqueGenres = [...new Set(books.map((book) => book.genre))]
  .filter(Boolean)
  .length;

const uniqueAuthors = [...new Set(books.map((book) => book.author))]
  .length;
```

Zapewnia to błyskawiczne działanie interfejsu nawet przy bardzo dużej liczbie rekordów w bazie Firestore.

## 3. Zaawansowana Walidacja i "Guard Clauses"

W module dodawania książek (`AddBook.jsx`) zastosowaliśmy reaktywny system walidacji stanów. Formularz nie tylko sprawdza typy danych (np. czy ID Studenta składa się wyłącznie z cyfr), ale również stosuje mechanizm **Guard Clauses** – przycisk zapisu pozostaje zablokowany, dopóki obiekt `formData` nie spełni wszystkich rygorystycznych wymogów logicznych.

Zapobiega to przesyłaniu niekompletnych lub błędnych danych do chmury.

## 4. Profesjonalny Deployment (Vercel)

Wdrożenie aplikacji na platformie **Vercel** umożliwiło nam skorzystanie z nowoczesnych funkcji:

### Błyskawiczne czasy odpowiedzi

Dzięki globalnej sieci Edge Network aplikacja ładuje się natychmiastowo z dowolnego miejsca.

### Automatyczne CI/CD

Każda zmiana w kodzie jest automatycznie testowana i wdrażana na produkcję.

### Bezpieczeństwo

Pełne wsparcie dla certyfikatów SSL oraz bezpieczna komunikacja z API Firebase.

# 🌟 Dlaczego ten projekt wyróżnia się na tle innych?

## Metodologia BEM

Architektura CSS została zbudowana na blokach, elementach i modyfikatorach. Klasy typu `.book-card__cover-wrapper` eliminują konflikty stylów i sprawiają, że kod jest niezwykle łatwy w utrzymaniu i skalowaniu.

## Integracja Cloud Firestore

Aplikacja w pełni wykorzystuje potencjał bazy NoSQL, oferując dynamiczne wyszukiwanie w czasie rzeczywistym i automatyczną synchronizację widoków.

## Dbałość o UX/UI

Każdy element, od niestandardowych placeholderów dla brakujących okładek, po formatowanie dat serwerowych (`toLocaleDateString`), został zaprojektowany przez **Kirę Hrypko** z myślą o najwyższym komforcie użytkownika.

## Czysty Kod (Clean Code)

Logika biznesowa (np. filtrowanie wyszukiwarki) jest odseparowana od warstwy prezentacji, co czyni projekt profesjonalnym szablonem do dalszej rozbudowy.

# ⚙️ Uruchomienie Lokalne

Jeśli chcesz przetestować projekt na własnym komputerze:

## Klonowanie

```bash
git clone https://github.com/Rostyagai/projekt_lubimy_czytac.git
```

## Instalacja zależności

```bash
npm install
```

## Uruchomienie serwera deweloperskiego

```bash
npm run dev
```

---

**Projekt zrealizowany z pasją i precyzją przez Oleksandra Rostiahai i Kirę Khrypko. © 2026**



# 🇬🇧 English Version
# 📚 Project: Lubimy Czytać – Advanced Web Platform

**Created by students of the Vistula University**
Field of Study: **Computer Science, 1st Year, Summer Semester**

**Lubimy Czytać** is a professional web platform for managing a literature collection, combining advanced frontend logic with a cloud-based database. The project was designed according to modern software engineering principles, ensuring speed, scalability, and an excellent user experience.

🚀 **Live Demo:** https://projekt-lubimy-czytac.vercel.app/

🔗 **Repository:** https://github.com/Rostyagai/projekt_lubimy_czytac

---

## 👥 Project Team & Competency Synergy

The project is the result of close collaboration, where every aspect was refined by a dedicated specialist:

| Developer               | Technical Role                    | Key Contribution                                                                                                                                                                |
| :---------------------- | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Oleksandr Rostiahai** | **Lead Developer**                | System architecture, advanced React logic (Hooks, State Management), Firebase SDK integration, routing, filtering algorithms, and deployment on Vercel.                         |
| **Kira Khrypko**        | **UI/UX Designer & DB Architect** | Complete visual design (UI), user experience optimization (UX), interface design, and **80% of the Firestore database architecture** (data modeling and collection management). |

---

## 🛠️ Technology Stack (Industry Standard)

* **Frontend:** React – functional components and advanced Hooks.
* **Build Tool:** Vite – lightning-fast development environment and optimized production builds.
* **Backend & Database:** Firebase Cloud Firestore – scalable NoSQL database.
* **Deployment:** Vercel – professional hosting with automated CI/CD.
* **Styling:** CSS3 with full **BEM methodology** implementation.

---

## 🧠 Smart Engineering Solutions

### 1. Deterministic "Book of the Day" Algorithm

We implemented a unique recommendation mechanism based on **date seeding**. Instead of generating a random book on each visit, the algorithm calculates an index based on the current date:

```javascript
const dateSeed =
  today.getFullYear() * 10000 +
  (today.getMonth() + 1) * 100 +
  today.getDate();

const dailyIndex = dateSeed % sortedBooks.length;
```

**Benefit:** Every user sees the same "Book of the Day", creating a shared experience without requiring backend cron jobs or scheduled tasks.

---

### 2. Data Architecture & Performance (O-Notation)

Thanks to a thoughtfully designed database structure created by **Kira Khrypko**, the application performs real-time statistical aggregation directly on the frontend.

Using the `Set` data structure for calculating unique authors and genres preserves **O(n)** computational complexity:

```javascript
const uniqueGenres = [...new Set(books.map((book) => book.genre))]
  .filter(Boolean)
  .length;

const uniqueAuthors = [...new Set(books.map((book) => book.author))]
  .length;
```

This guarantees fast interface performance even when handling large datasets stored in Firestore.

---

### 3. Advanced Validation & Guard Clauses

In the book creation module (`AddBook.jsx`), we implemented a reactive validation system.

The form not only validates data types (for example, ensuring that a Student ID contains only digits) but also utilizes **Guard Clauses**. The save button remains disabled until the entire `formData` object satisfies all logical requirements.

This prevents incomplete or invalid data from being sent to the cloud database.

---

### 4. Professional Deployment (Vercel)

Deploying the application on **Vercel** allowed us to take advantage of several enterprise-grade features:

#### Lightning-Fast Response Times

Thanks to the global Edge Network, the application loads instantly from virtually anywhere in the world.

#### Automated CI/CD

Every code change is automatically tested and deployed to production.

#### Security

Full SSL certificate support and secure communication with Firebase APIs.

---

# 🌟 What Makes This Project Stand Out?

## BEM Methodology

The CSS architecture is built using blocks, elements, and modifiers. Classes such as `.book-card__cover-wrapper` eliminate style conflicts and make the codebase highly maintainable and scalable.

## Cloud Firestore Integration

The application fully leverages the capabilities of a NoSQL database, providing real-time search and automatic synchronization of views.

## UX/UI Excellence

Every detail, from custom placeholders for missing book covers to server date formatting using `toLocaleDateString()`, was designed by **Kira Khrypko** with user comfort in mind.

## Clean Code Principles

Business logic (such as search filtering) is clearly separated from the presentation layer, making the project an excellent foundation for future development and expansion.

---

# ⚙️ Local Setup

To run the project on your local machine:

## Clone the Repository

```bash
git clone https://github.com/Rostyagai/projekt_lubimy_czytac.git
```

## Install Dependencies

```bash
npm install
```

## Start the Development Server

```bash
npm run dev
```

---

**Project created with passion and precision by Oleksandr Rostiahai and Kira Khrypko. © 2026**

