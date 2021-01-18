// Movie Class: Represents a movie
class Movie {
  constructor(title, description, rating) {
    this.title = title;
    this.description = description;
    this.rating = rating;
  }
}

// UI Class: Handles UI tasks
class UI {
  static displayMovies() {
    const StoredMovies = [
      {
        title: "Movie 1",
        description: "abcd",
        rating: "8",
      },
      {
        title: "Movie 2",
        description: "abcd",
        rating: "7.5",
      },
    ];

    const movies = StoredMovies;

    movies.forEach((movie) => UI.addMovieToList(movie));
  }

  static addMovieToList(movie) {
    const list = document.querySelector("#movie-list");
    const row = document.createElement("tr");

    row.innerHTML = `
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
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#rating").value = "";
  }
}

// Store Class: Handles storage

// Events: Display movies
document.addEventListener("DOMContentLoaded", UI.displayMovies);

// Event: Add a movie
document.querySelector("#movie-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const rating = document.querySelector("#rating").value;

  // Validate
  if (title === "" || description === "" || rating === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instantiate Movie
    const movie = new Movie(title, description, rating);

    // Add movie to UI
    UI.addMovieToList(movie);

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a movie
document.querySelector("#movie-list").addEventListener("click", (e) => {
  UI.deleteMovie(e.target);
});
