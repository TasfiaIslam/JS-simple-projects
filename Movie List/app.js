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
        <td><a href="" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }
}

// Store Class: Handles storage

// Events: Display movies
document.addEventListener("DOMContentLoaded", UI.displayMovies);

// Event: Add a movie

// Event: Remove a movie
