const app = Vue.createApp({
  data() {
    return {
      movies: [],
      images: [],
      original_titles: [],
    }
  },

  methods: {

    created() {

      fetch("https://api.themoviedb.org/3/movie/popular?api_key=822bc57500db955a10820e72e52fd19f&language=it-US&page=1")
        .then(response => response.json())
        .then(data => (this.movies = data.results));

      // let path = "https://image.tmdb.org/t/p/original";
      // for (movie of this.movies) {

      //   this.original_titles.push(movie.title)
      //   this.images.push(path.concat(movie.poster_path))
      // }
    },

    bindImage(poster_path){
        return `https://image.tmdb.org/t/p/original${poster_path}`
    }
},
  mounted(){
    this.created()
  }
   
    
  


})