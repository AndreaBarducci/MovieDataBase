<template>
  <div class="bg-gray-400">
    <div class="text-center">
      <h1 class="font-extrabold text-4xl">
        {{ actor.name }}
      </h1>
    </div>
    <div class="flex flex-row border-b-4 border-black m-2">
      <div>
        <img
          v-if="actor.profile_path"
          :src="actor.universalPosterPath()"
          class="max-w-xs rounded-xl"
        />
        <img
          v-else
          src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found.png"
          alt="poster"
          class="max-w-xs rounded-xl"
        />
      </div>
      <div class="md:flex flex-row m-8">
        <div class="ml-4">
          <div>
            <p v-if="actor.birthday">
              {{ $t("birthday") }} {{ actor.universalBirthDate(birthday) }}
            </p>
            <p v-if="actor.deathday">
              {{ $t("deathday") }} {{ actor.universalDeathDate(deathday) }}
            </p>
            <p v-if="actor.place_of_birth">
              {{ $t("placeOfBirth") }} {{ actor.place_of_birth }}
            </p>
            <p v-if="actor.biography">
              {{ $t("biography") }} {{ actor.biography }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 class="font-semibold mx-2">{{ $t("knownFor") }}</h2>
      <div class="flex flex-row overflow-x-auto text-center">
        <ul v-for="film in films" :key="film.id" class="">
          <router-link
            :to="{
              name: 'about',
              params: {
                type: film.media_type,
                lang: $route.params.lang,
                id: film.id,
              },
            }"
          >
            <li class="mx-1 max-h-md w-48" v-if="film?.poster_path">
              <img
                :src="film.universalPosterPath()"
                alt="poster"
                class="rounded-xl"
              />
              <p class="troncate">{{ film.universalTitle() }}</p>
            </li>
          </router-link>
        </ul>
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
import Content from "../Classes/Content";

import { listServices } from "../services/listServices";
import { metatagServices } from "../services/metatagServices";
export default {
  components: {},

  data() {
    return {
      Content,
      metatagServices,
      listServices,
      actor: {},
      films: [],
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
        .then((data) => (this.actor = data));

      listServices
        .getFilmsById(this.$route.params.type, this.$route.params.id)
        .then((data) => {
          this.films = [...this.films, ...data];
        });
    },
  },

  watch: {
    films: {
      handler() {
        this.films = this.films.sort((a, b) => b.popularity - a.popularity);
      },
    },

    $route: {
      handler(newRoute) {
        if (newRoute.name) return;
        this.actor = {};
        this.films = [];
        this.details();
      },
    },
  },

  created() {
    this.$i18n.locale = this.$route.params.lang;
    this.details();
  },

  beforeUpdate() {
    if (this.actor.id !== undefined) {
      metatagServices.changeTitle(this.actor.name);
    }
  },
};
</script>
