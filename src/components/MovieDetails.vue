<template>
  <div class="bg-gray-400 container">
    <div class="flex flex-row">
      <div class="max-w-md m-2">
        <div>
          <img
            v-if="object.posterPath"
            :src="object.universalPosterPath()"
            class="max-w-md rounded-2xl"
          />
          <Review
            :rate="object.vote_average"
            class="text-3xl text-center text-red-700"
          />
        </div>
        <div>
          <iframe
            v-if="this?.trailers.length != 0"
            :src="ytTrailer"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <button
            v-if="this?.trailers.length > 1"
            @click="getTrailer()"
            class="
              align-middle
              bg-blue-700
              hover:bg-white hover:text-blue-700
              text-white
              font-semibold
              py-2
              px-4
              m-2
              border-2 border-black
              rounded-xl
            "
          >
            {{ $t("nextTrailer") }}
          </button>
        </div>
      </div>
      <div class="flex flex-wrap mx-4">
        <div class="place-self-center text-center w-full">
          <h1 v-if="object.universalTitle" class="font-extrabold text-5xl">
            {{ object.universalTitle() }}
          </h1>
        </div>
        <div class="flex flex-wrap max-w-lg items-center">
          <div class="mx-2">
            <p
              v-if="
                object.universalDate &&
                (object?.release_date || object?.first_air_date)
              "
            >
              {{ $t("releaseDate") }} {{ object.universalDate() }}
            </p>
          </div>
          <div v-if="object.genres?.length" class="mx-2">
            <p class="font-semibold text-lg">{{ $t("genres") }}</p>
            <div
              v-for="genre in object.genres"
              :key="genre.id"
              class="list-item ml-4"
            >
              <p class="mx-1">{{ genre.name }}</p>
            </div>
          </div>

          <div v-if="object?.episode_run_time?.length" class="mx-2">
            <p>
              {{ $t("episodeRunTime") }}
              {{ object.episode_run_time[0] }}m
            </p>
          </div>
          <div v-if="object.runtime > 0" class="mx-2">
            <p>
              {{ $t("runTime") }}
              {{ convert(object.runtime) }}
            </p>
          </div>

          <div v-if="object.type === 'tv'" class="mx-2">
            <div v-if="object.number_of_seasons > 0">
              {{ $t("numberOfSeasons") }} {{ object.number_of_seasons }}
            </div>
          </div>
          <div v-if="object.type === 'tv'" class="mx-2">
            <div v-if="object.number_of_episodes > 0">
              {{ $t("numberOfEpisodes") }} {{ object.number_of_episodes }}
            </div>
          </div>

          <div v-if="object.type === 'movie'" class="mx-2">
            <div v-if="object.revenue > 0" class="mx-2">
              {{ $t("revenue") }}
              {{ object.universalNumber(object.revenue) }}
            </div>
          </div>
          <div v-if="object.type === 'movie'" class="mx-2">
            <div v-if="object.budget > 0" class="mx-2">
              {{ $t("budget") }}
              {{ object.universalNumber(object.budget) }}
            </div>
          </div>
        </div>

        <div v-if="object?.imdb_id && imdbUrl !== ''" class="mx-2">
          <a :href="imdbUrl" target="_blank"
            ><i
              class="
                fab
                fa-imdb
                text-8xl text-transparent
                bg-clip-text bg-yellow-400
              "
            ></i
          ></a>
        </div>
        <button @click="post()" class="mx-2">
          <div class="inline-block">
            <star-rating
              :show-rating="false"
              @hover:rating="mouseOverRating = $event"
              :increment="0.5"
            ></star-rating>
          </div>
        </button>
        <div class="">
          <p class="text-xl" v-if="object.overview !== ''">
            {{ $t("overview") }}{{ object.overview }}
          </p>
        </div>
        <div class="flex flex-wrap">
          <div
           
            class="flex flex-row place-items-center text-center"
          >
            <select
              v-if="availableProviderOptions()?.length"
              v-model="selectedProviderOption"
              class="
                bg-blue-700
                hover:bg-white hover:text-blue-700
                text-white
                font-semibold
                border-2 border-black
                rounded-xl
                h-md
                uppercase
              "
            >
              <option
                v-for="(type, i) in availableProviderOptions()"
                :key="i"
                :value="type"
              >
                {{ $t("providerOptions." + type) }}
              </option>
            </select>

            <div v-for="(x, i) in typeList" :key="i" class="mx-4">
              <img
                :src="listServices.bindImage(x.logo_path)"
                alt="poster"
                class="rounded-2xl mx-auto self-center"
              />
              <p class="truncate">{{ x.provider_name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row overflow-x-auto text-center">
      <ul v-for="actor in cast" :key="actor.id">
        <router-link
          :to="{
            name: 'about',
            params: {
              type: 'person',
              lang: $route.params.lang,
              id: actor.id,
            },
          }"
        >
          <li class="mx-2 max-h-lg w-64" v-if="actor?.profile_path">
            <img
              :src="actor.universalPosterPath()"
              alt="poster"
              class="rounded-xl"
            />
            <p class="truncate">{{ actor.name }} - {{ actor.character }}</p>
          </li>
        </router-link>
      </ul>
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
import Trailer from "../Classes/Trailer";
import Review from "./Review.vue";
import Content from "../Classes/Content";
import Cast from "../Classes/Cast";
import { listServices } from "../services/listServices";
import { metatagServices } from "../services/metatagServices";
import StarRating from "vue-star-rating";

export default {
  components: { Review, StarRating },

  data() {
    return {
      value: {
        value: 0,
      },
      vote: 0,
      providers: {},
      selectedProviderOption: "",
      Trailer,
      imdbUrl: "",
      Cast,
      Content,
      metatagServices,
      listServices,
      object: {},
      cast: [],
      trailers: [],
      copy: [],
      ytUrl: "https://www.youtube.com/embed/",
      ytTrailer: "",
      index: 0,
      rating: 0,
      resetableRating: 2,
      currentRating: 0,
      mouseOverRating: 0,
    };
  },

  methods: {
    availableProviderOptions() {
      const array = Object.keys(this.currentProvider).filter((key) =>
        Array.isArray(this.currentProvider[key])
      );

      if (this.selectedProviderOption === "" && array?.length) {
        this.selectedProviderOption = array[0];
      }

      return array;
    },

    post() {
      this.value.value = this.mouseOverRating * 2;
      const options = {
        method: "POST",
        body: JSON.stringify(this.value),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      fetch(
        `${listServices.baseUrl}${this.$route.params.type}/${this.$route.params.id}
        /rating?api_key=${listServices.apiKey}&guest_session_id=${listServices.guestSessionId}`,
        options
      );
    },

    showCurrentRating(rating) {
      this.currentSelectedRating =
        rating === 0
          ? this.currentSelectedRating
          : "Click to select " + rating + " stars";
    },

    changeType(event) {
      this.type = event.target.value;
    },

    getTrailer() {
      if (this.index === this.trailers.length) this.index = 0;
      let id = this?.trailers[this.index]?.key;
      this.ytTrailer = `${this.ytUrl}${id}`;
      this.index++;
    },

    convert(t) {
      return `${(t / 60) ^ 0}` + "h" + (t % 60) + "m";
    },

    details() {
      listServices
        .getDetailsById(
          this.$route.params.type,
          this.$route.params.id,
          this.$route.params.lang
        )
        .then((data) => (this.object = data));

      listServices
        .getCastById(this.$route.params.type, this.$route.params.id)
        .then((data) => (this.cast = data));

      listServices
        .getTrailersById(this.$route.params.type, this.$route.params.id)
        .then((data) => (this.copy = data));

      listServices
        .getProviderById(this.$route.params.type, this.$route.params.id)
        .then((x) => (this.providers = x.results));
    },
  },

  watch: {
    copy: {
      handler() {
        this.trailers = [];
        this.index = 0;
        for (let obj of this.copy) {
          if (obj.type === "Trailer") this.trailers.push(obj);
        }
        this.getTrailer();
        if (this.object?.imdb_id) this.imdbUrl = this.object.universalUrl();
      },
    },

    $route: {
      handler() {
        if (!this.$route.params.id || this.$route.params.type === "person")
          return;
        this.object = {};
        this.trailers = [];
        this.details();
      },
    },
  },

  created() {
    this.$i18n.locale = this.$route.params.lang;
    this.details();
    if (listServices.guestSessionId === "") listServices.getGuestSessionId();
  },

  beforeUpdate() {
    if (this.object.id !== undefined) {
      metatagServices.changeTitle(this.object.universalTitle());
    }
  },

  computed: {
    currentProvider() {
      const provider = this.providers[this.$route.params.lang.toUpperCase()];

      if (!provider) {
        const fallback = Object.keys(this.providers)[0];

        if (!fallback) return {};
        return this.providers[fallback];
      }
      return provider;
    },

    mouseOverRatingText() {
      return this.mouseOverRating * 2;
    },

    typeList() {
      return this.currentProvider?.[this.selectedProviderOption ?? ""] ?? [];
    },
  },
};
</script>