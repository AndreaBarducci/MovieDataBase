<template>
  <div class="bg-gray-400">
    <div class="text-center">
      <h1 v-if="object.universalTitle" class="font-extrabold text-4xl">
        {{ object.universalTitle() }}
      </h1>
    </div>
    <div class="flex flex-row">
      <div>
        <img
          v-if="object.posterPath"
          :src="object.universalPosterPath()"
          class="max-w-lg"
        />
        <Review
          :rate="object.vote_average"
          class="text-3xl text-center text-red-700"
        />
      </div>
      <div class="md:flex flex-row m-8">
        <div class="ml-4">
          <div>
            <p v-if="object.type === 'tv'">
              {{ $t("numberOfSeasons") }} {{ object.number_of_seasons }}
              {{ $t("numberOfEpisodes") }} {{ object.number_of_episodes }}
              {{ $t("episodeRunTime") }} {{ object.episode_run_time[0] }} m
            </p>
            <div v-else>
              <p v-if="object.revenue > 0">
                {{ $t("revenue") }}
                {{ object.universalNumber(object.revenue) }}
              </p>
              <p v-if="object.budget > 0">
                {{ $t("budget") }}
                {{ object.universalNumber(object.budget) }}
              </p>
            </div>

            <p
              v-if="
                object.universalDate &&
                (object?.release_date || object?.first_air_date)
              "
            >
              {{ $t("releaseDate") }} {{ object.universalDate() }}
            </p>
            <p v-else>{{ $t("notAvailable") }}</p>

            <div v-if="object.genres?.length">
              <p class="font-semibold">{{ $t("genres") }}</p>
              <ul v-for="genre in object.genres" :key="genre.id">
                <li class="list-disc ml-8">{{ genre.name }}</li>
              </ul>
            </div>

            <p class="m-4 text-xl" v-if="object.overview !== ''">
              {{ $t("overview") }}{{ object.overview }}
            </p>
          </div>
          <div
            class="
              md:flex
              flex-wrap
              place-items-center
              align-middle
              text-center
            "
          >
            <div
              v-for="logo in object.productionCompanies"
              class="m-2 max-w-xs mx-auto"
              :key="logo.id"
            >
              <img
                v-if="logo.logoPath"
                :src="logo.bindedImage"
                alt="company_production"
                class="max-h-60 mx-auto my-auto"
              />
              <img
                v-else
                src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found.png"
                alt="empty"
              />
              <p class="font-bold">{{ logo.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link
      :to="{
        name: 'list',
        params: { type: $route.params.type, lang: $route.params.lang },
      }"
    >
      <button
        class="
          align-middle
          bg-blue-500
          hover:text-blue-700
          text-white
          font-bold
          w-full
          py-2
          px-4
          mb-2
          border-2 border-black
          rounded-xl
        "
      >
        {{ $t("backToList") }}
      </button>
    </router-link>
  </div>
</template>
<script>
import Review from "./Review.vue";
import Content from "../Classes/Content";

import { listServices } from "../services/listServices";
import { metatagServices } from "../services/metatagServices";
export default {
  components: { Review },

  data() {
    return {
      Content,
      metatagServices,
      listServices,
      object: {},
    };
  },

  methods: {
    details() {
      listServices
        .getDetailsById(
          this.$route.params.type,
          this.$route.params.id,
          this.$route.params.lang
        )
        .then((data) => (this.object = data));
    },
  },

  watch: {
    $route: {
      handler() {
        if (!this.$route.params.id) return;
        this.object = {};
        this.details();
      },
    },
  },

  created() {
    this.$i18n.locale = this.$route.params.lang;
    this.details();
  },
  beforeUpdate() {
    if (this.object.id !== undefined) {
      metatagServices.changeTitle(this.object.universalTitle());
    }
  },
};
</script>
