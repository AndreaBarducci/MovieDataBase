const app = Vue.createApp({
  data() {
    return {
      movies: [],
      index: 0,
      app: [],
    }
  },

  methods: {

    next() {
      this.index += 1;
      fetch(this.bindPage(this.index))
        .then(response => response.json())
        .then(data => {
          this.app = data.results;
          for (movie of this.app) {
            this.movies.push(movie)
          }
        });
    },


    bindImage(poster_path) {
      return `https://image.tmdb.org/t/p/original${poster_path}`
    },

    bindPage(index) {
      return `https://api.themoviedb.org/3/movie/popular?api_key=6f9286d54de4891ea7a5c91779e09786&language=it-US&page=${index}`

    },

    goToDetail(id) {
      location.href = this.bindUrl(id)
    },

    bindUrl(id) {
      return `../pag2/movieDetails.html?id=${id}`
    },

    showDetails(movie, id) {
      window.location.href = "movieDetails.html";
    },

  },

  computed: {
    full() {
      return this.index === 500;
    }
  },

    mounted() {
      this.next()
    }
})