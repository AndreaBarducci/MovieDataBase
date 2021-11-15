<template>
  <div>
    <div class="navBar"></div>
    <div class="row">
      <div v-for="movie in movies" :key="movie.id">
        <div class="column">
        
         <router-link :to="'/aboutMovie/' + movie.id"><img
            :src="bindImage(movie.poster_path)"
            :href="bindUrl(movie.id)"
            alt="poster"
            class="image"
            :title="movie.title"
          /></router-link>
          <Review :rate="movie.vote_average" />
        </div>
      </div>
    </div>
    <button @click="next" :disabled="full" class="button">Load More</button>
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

    bindUrl(id) {
      return `../pag2/movieDetails.html?id=${id}`;
    },
  },
  mounted() {
    this.next();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
