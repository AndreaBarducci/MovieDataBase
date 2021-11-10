const app = Vue.createApp({
    data() {
        return {
            movies: [],
            index: 0,

        }
    },

    methods: {

        created() {
            this.index += 1;
            fetch(this.bindPage(this.index))
                .then(response => response.json())
                .then(data => (this.movies = data.results));
            this.scrollToTop()
        },

        bindImage(poster_path) {
            return `https://image.tmdb.org/t/p/original${poster_path}`
        },

        bindPage(index) {
            return `https://api.themoviedb.org/3/movie/popular?api_key=822bc57500db955a10820e72e52fd19f&language=it-US&page=${index}`

        },
        
        scrollToTop() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto'
            });
        },

        showDetails() {
            window.location.href = 'movieDetails.html'
        }
    },
    mounted() {
        this.created()
    }
})