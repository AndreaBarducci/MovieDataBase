<template>
  <div>
    <div class="navBar">
      <div>
        <button>Movies</button>
        <button>Series</button>
      </div>
    </div>
    <div class="row">
      <div v-for="movie in movies" :key="movie.id">
        <div class="column">
          <router-link :to="'/about/' +  + movie.id"
            ><img
              v-if="movie.poster_path"
              :src="bindImage(movie.poster_path)"
              alt="poster"
              class="image"
              :title="movie.title"
          /></router-link>
          <Review :rate="movie.vote_average" />
        </div>
      </div>
    </div>
    <button @click="next" class="button">Load More</button>
  </div>
</template>

<script>
import Review from "./Review.vue";

export default {
  components: { Review },
  data() {
    return {

      index: 0,
      movies: [],
      app: [],
      series: [],
    };
  },

  methods: {
    
 
    
    
    
    next() {
      let movie;
      this.index += 1;
      fetch(this.bindPage(this.index))
        .then((response) => response.json())
        .then((data) => {
          this.app = data.results;
          for (movie of this.app) {
            this.movies.push(movie);
          }
        });
    },

    bindPage(index) {
      return `https://api.themoviedb.org/3/movie/popular?api_key=6f9286d54de4891ea7a5c91779e09786&language=en&page=${index}`;
    },
    bindImage(poster_path) {
      return `https://image.tmdb.org/t/p/original${poster_path}`;
    },
  },
  mounted() {
    this.next();
  },
};
</script>

