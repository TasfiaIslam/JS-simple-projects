// Movie Class: Represents a movie
class Movie {
  constructor(movieId, title, description, rating) {
    this.movieId = movieId;
    this.title = title;
    this.description = description;
    this.rating = rating;
  }
}

// UI Class: Handles UI tasks
class UI {
  static displayMovies() {
    const movies = Store.getMovies();

    movies.forEach((movie) => UI.addMovieToList(movie));
  }

  static addMovieToList(movie) {
    const list = document.querySelector("#movie-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${movie.movieId}</td>
        <td>${movie.title}</td>
        <td>${movie.description}</td>
        <td>${movie.rating}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }
  static deleteMovie(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#movie-form");
    container.insertBefore(div, form);

    // Vanish in few seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#movieId").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#rating").value = "";
  }
}

// Store Class: Handles storage
class Store {
  static getMovies() {
    let movies;
    if (localStorage.getItem("movies") === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem("movies"));
    }
    return movies;
  }

  static addMovie(movie) {
    const movies = Store.getMovies();
    books.push(movie);
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  static removeMovie(id) {
    const movies = Store.getMovies();

    movies.forEach((movie, index) => {
      if (movie.movieId === movieId) {
        movies.splice(index, 1);
      }
    });

    localStorage.setItem("movies", JSON.stringify(movies));
  }
}

// Events: Display movies
document.addEventListener("DOMContentLoaded", UI.displayMovies);

// Event: Add a movie
document.querySelector("#movie-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const movieId = document.querySelector("#movieId").value;
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const rating = document.querySelector("#rating").value;

  // Validate
  if (movieId === "" || title === "" || description === "" || rating === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instantiate Movie
    const movie = new Movie(movieId, title, description, rating);

    // Add movie to UI
    UI.addMovieToList(movie);

    // Add movie to store
    Store.addMovie(movie);

    // Show success message
    UI.showAlert("Movie added", "success");

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a movie
document.querySelector("#movie-list").addEventListener("click", (e) => {
  UI.deleteMovie(e.target);

  // Show success message
  UI.showAlert("Movie removed", "success");
});
