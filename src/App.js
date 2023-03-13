import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [showMovies, setShowMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");
  const [dark, setDark] = useState([]);

  async function getAllMovies() {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchMovies}&apikey=e62a6d22`
    );
    const data = await response.json();

    if (data.Response === "True") {
      setShowMovies(data.Search);
    } else {
      console.log("nothing find");
    }
  }

  useEffect(() => {
    getAllMovies();
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setDark(items);
    }
  }, []);

  function toogle() {
    setDark(!dark);
  }
  function inputValue(e) {
    setSearchMovies(e.target.value);
  }
  function searchButton(e) {
    e.preventDefault();
    getAllMovies();
  }
  return (
    <div className={dark ? "on" : "of"}>
      <div className="title-input-button">
        <h1 className="title-up">Movies</h1>
        <form className="index-form">
          <input
            type="text"
            className="movie-Input"
            placeholder="Enter Movie Title"
            onChange={inputValue}
          />
          <button className="movie-Input-Button" onClick={searchButton}>
            Search
          </button>
        </form>
      </div>
      <div>
        <input type="checkbox" onChange={toogle} className="checkbox" />
        <label className="label">Toggle Dark Mode</label>

        <div className="movieShow">
          {showMovies.map((movie) => (
            <div className="poster" key={movie.id}>
              {<img src={movie.Poster} />}

              <h3>{movie.Title}</h3>
              <p> Type : {movie.Type}</p>
              <p> {movie.Year} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
