<template>
  <div>
    <div class="navBar"></div>

    <div class="leftPart">
      <h2 class="movieTitle">{{ movie.title }}</h2>
      <img
        v-if="movie.poster_path"
        class="img"
        :src="bindImage(movie.poster_path)"
        alt=""
      />
      <Review :rate="movie.vote_average" />
    </div>

    <div class="rightPart">
      <div>
        <div class="infos1">
          <p v-if="movie.revenue != 0">Revenue: {{ movie.revenue }}$</p>
          <p v-if="movie.budget != 0">Budget: {{ movie.budget }}$</p>
          <p>Release date: {{ movie.release_date }}</p>
        </div>  
        <div class="infos2">
          <ul v-for="genre in movie.genres" :key="genre.id">
            <li class="genre">{{ genre.name }}</li>
          </ul>
        </div>
      </div>
      <div class="overview">
        <p class="paragraph">{{ movie.overview }}</p>
      </div>
      <div
        v-for="logo in movie.production_companies"
        class="rightPart"
        :key="logo.id"
      >
        <img
          v-if="logo.logo_path != null"
          :src="bindImage(logo.logo_path)"
          alt="company_production"
          class="logo"
        />
        <img
          v-else
          src="../assets/images/blank.jpeg"
          alt="empty"
          class="logo"
        />
        <p class="logoName">{{ logo.name }}</p>
      </div>
    </div>
    <router-link to="/">
      <button class="button">Back to list</button></router-link
    >
  </div>
</template>
<script>
import Review from "./Review.vue";
import { movieServices } from "../services/movieServices";
export default {
  components: { Review },

  data() {
    return {
      movie: {},
    };
  },
  methods: {
    created() {
      movieServices
        .getDetailsById(this.$route.params.id)
        .then((data) => (this.movie = data));
    },

    bindImage(poster_path) {
      return `https://image.tmdb.org/t/p/original${poster_path}`;
    },

  },

  activated() {
    this.created();
  },
};
</script>