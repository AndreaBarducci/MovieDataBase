<template>
  <div class="bg-gray-400">
    <div class="flex flex-row border-b-4 border-black mb-2">
      <div>
        <img
          v-if="object.posterPath"
          :src="object.universalPosterPath()"
          class="max-w-sm rounded-xl m-2"
        />
        <Review
          :rate="object.vote_average"
          class="text-3xl text-center text-red-700"
        />
        <iframe
          v-if="this?.trailers.length != 0"
          width="560"
          height="315"
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
      <div>
        <div class="text-center w-full">
          <h1 v-if="object.universalTitle" class="font-extrabold text-4xl">
            {{ object.universalTitle() }}
          </h1>
          <div class="flex flex-row place-content-center mt-2">
            <p
              class="border-2 border-black rounded-lg mx-1 bg-white"
              v-if="
                object.universalDate &&
                (object?.release_date || object?.first_air_date)
              "
            >
              {{ $t("releaseDate") }} {{ object.universalDate() }}
            </p>
            <div
              v-if="object.genres?.length"
              class="border-2 border-black rounded-lg mx-1 bg-white"
            >
              <div
                v-for="genre in object.genres"
                :key="genre.id"
                class="inline-block"
              >
                <p class="mx-2">{{ genre.name }}</p>
              </div>
            </div>
            <div
              v-if="object?.episode_run_time?.length"
              class="border-2 border-black rounded-lg mx-1 bg-white"
            >
              <p>
                {{ $t("episodeRunTime") }}
                {{ object.episode_run_time[0] }}m
              </p>
            </div>
            <div
              class="border-2 border-black rounded-lg mx-1 bg-white"
              v-if="object.runtime > 0"
            >
              <p>
                {{ $t("runTime") }}
                {{ convert(object.runtime) }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-row m-auto">
          <div class="m-4">
            <div v-if="object.type === 'tv'">
              <p v-if="object.number_of_seasons > 0">
                {{ $t("numberOfSeasons") }} {{ object.number_of_seasons }}
              </p>
              <p v-if="object.number_of_episodes > 0">
                {{ $t("numberOfEpisodes") }} {{ object.number_of_episodes }}
              </p>
            </div>
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
          </div>
          <div v-if="object?.imdb_id && imdbUrl !== ''" class="bg-black">
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
        </div>
        <p class="text-xl mx-4" v-if="object.overview !== ''">
          {{ $t("overview") }}{{ object.overview }}
        </p>
        <div v-if="$route.params.type === 'movie'">
          <select
            v-if="availableProviderOptions?.length"
            v-model="selectedProviderOption"
            class="
              align-middle
              bg-blue-700
              hover:bg-white hover:text-blue-700
              text-white
              font-semibold
              border-2 border-black
              rounded-xl
              h-12
              uppercase
              mr-4
            "
          >
            <option
              v-for="(type, i) in availableProviderOptions"
              :key="i"
              :value="type"
            >
              {{ $t("providerOptions." + type) }}
            </option>
          </select>
          <div v-for="(x, i) in typeList" :key="i">
            <img :src="listServices.bindImage(x.logo_path)" alt="poster" />
            <p>{{ x.provider_name }}</p>
          </div>
        </div>
        <div class="md:flex flex-wrap align-middle">
          <div
            v-for="logo in object.productionCompanies"
            class="max-w-xs mx-auto"
            :key="logo.id"
          >
            <div
              class="
                inline-block
                border-2 border-black
                rounded-lg
                bg-white
                text-center
              "
            >
              <img
                v-if="logo.logoPath"
                class="mx-auto object-contain w-48 h-48 rounded-lg"
                :src="logo.bindedImage"
              />
              <img
                v-else
                src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found.png"
                alt="poster"
              />
              <span class="font-semibold m-1">
                {{ logo.name }}
              </span>
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
          <li class="mx-1 max-h-lg w-64" v-if="actor?.profile_path">
            <img
              :src="actor.universalPosterPath()"
              alt="poster"
              class="rounded-xl"
            />
            <p class="troncate">{{ actor.name }} - {{ actor.character }}</p>
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

export default {
  components: { Review },

  data() {
    return {  
      providers: {},
      selectedProviderOption: "buy",
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
    };
  },

  methods: {
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

    getImage(x) {
      console.log(x);
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
    availableProviderOptions() {
      return Object.keys(this.currentProvider).filter((key) =>
        Array.isArray(this.currentProvider[key])
      );
    },

    typeList() {
      return this.currentProvider?.[this.selectedProviderOption ?? ""] ?? [];
    },
  },
};
</script>
