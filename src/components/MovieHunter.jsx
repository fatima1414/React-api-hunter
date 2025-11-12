import React, { useState } from "react";

const MovieHunter = () => {
  const [query, setQuery] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const huntMovies = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=thewdb&s=${query}`
      );
      const data = await response.json();

      if (data.Search) {
        const filtered = data.Search.filter((movie) =>
          movie.Title.toLowerCase().includes(query.toLowerCase())
        );

        setAllMovies((prev) => [...prev, ...filtered]);
      }
    } catch (error) {
      console.error("API Hunter failed:", error);
    }

    setLoading(false);
    setQuery(""); // clear input after search
  };

  const clearAll = () => {
    setAllMovies([]);
  };

  return (
    <div className="container py-4 text-center">
      <h1 className="mb-4">🎯 Movie Hunter</h1>

      {/* Search Input + Buttons */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-warning me-2"
          onClick={huntMovies}
          disabled={loading || !query}
        >
          {loading ? "Hunting..." : "Hunt 🎥"}
        </button>
        <button
          className="btn btn-danger"
          onClick={clearAll}
          disabled={allMovies.length === 0}
        >
          Clear All
        </button>
      </div>

      {/* Movie Grid */}
      <div className="row">
        {allMovies.length > 0 ? (
          allMovies.map((movie, index) => (
            <div className="col-md-3 mb-4" key={movie.imdbID + index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  alt={movie.Title}
                  className="card-img-top"
                  style={{ height: "350px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text text-muted">{movie.Year}</p>
                  <p className="card-text">
                    <strong>Type:</strong> {movie.Type}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-danger">No movies hunted yet.</p>
        )}
      </div>
    </div>
  );
};

export default MovieHunter;
