const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000; 

app.get('/movies', async (req, res) => {
  try {
    const { search } = req.query;
    console.log(search);

    if (!search) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const apiKey = "2a749fff70953b600737e8b54b24655a";
    const baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`;

    const tmdbApiResponse = await axios.get(baseUrl);

    console.log('TMDB API Response:', tmdbApiResponse.data);

    if (!tmdbApiResponse.data.results) {
      return res.status(500).json({ error: 'Unexpected response from TMDB API' });
    }

    const movies = tmdbApiResponse.data.results.slice(0, 10).map((movie) => ({
      movie_id: movie.id,
      title: movie.title,
      poster_image_url: `https://developers.themoviedb.org/3/getting-started/images${movie.poster_path}`,
      popularity_summary: `${movie.popularity} out of ${movie.vote_count}`,
    }));
    const acceptHeader = req.headers.accept || '';
    if (acceptHeader.includes('application/json')) {
      res.json(movies);
    } else {
      res.send('<html><body><h1>Nuxt.js HTML Content</h1></body></html>');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
