<template>
    <div>
      <h1>Movie Search</h1>
      <div>
        <input v-model="searchQuery" placeholder="Enter movie title" />
        <button @click="searchMovies">Search</button>
      </div>
      <div v-if="movies.length > 0">
        <div v-for="movie in movies" :key="movie.movie_id" class="movie-card">
          <h2>{{ movie.title }}</h2>
          <img :src="movie.poster_image_url" alt="Movie Poster" />
          <p>{{ movie.popularity_summary }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        movies: [],
      };
    },
    methods: {
      async searchMovies() {
        try {
        <!-- Installed Axios into the front end -->
          const response = await this.$axios.get(`/movies?search=${this.searchQuery}`);
          if (response.data) {
            this.movies = response.data;
          } else {
            console.error('Invalid response format:', response);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .movie-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  </style>
  