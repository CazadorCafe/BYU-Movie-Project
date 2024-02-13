//added this so I could have the api key more secure
require("dotenv").config();
const express = require("express");
const axios = require("axios");
//added in cors that adds in a security feature implemented by web browsers

const cors = require("cors");

const app = express();
//changed to port 4000 so it doesn't conflict with the frontend
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get("/movies", async (req, res) => {
  try {
    const { search } = req.query;
    //changed the API_KEY to be better protected
    const apiKey = process.env.API_KEY;

    const baseUrl = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apiKey}&include_adult=false&language=en-US&region=US`;

    const tmdbApiResponse = await axios.get(baseUrl);

    console.log("TMDB API Response:", tmdbApiResponse.data);

    const movies = tmdbApiResponse.data.results.slice(0, 10).map((movie) => ({
      movie_id: movie.id,
      title: movie.title,
      //fixed the photo path to use the right one
      poster_image_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      popularity_summary: `${movie.popularity} out of ${movie.vote_count}`,
    }));
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
