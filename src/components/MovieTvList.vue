<template>
  <div class="bg-gray-400">
    <infinite-scroll
      @infinite-scroll="loadData"
      :noResults="full"
      :message="message"
    >
      <div class="md:flex flex-wrap place-content-center">
        <div
          v-for="(object, index) in contents"
          :key="index"
          class="m-4 text-center"
        >
          <router-link
            :to="{
              name: 'about',
              params: {
                type: $route.params.type,
                id: object.id,
                lang: $route.params.lang,
              },
            }"
          >
            <div
              class="bg-gray-50 border-8 border-black rounded-xl md:max-w-xs"
            >
              <img
                v-if="object.backdropPath"
                :src="listServices.bindImage(object.backdropPath)"
                alt="poster"
                class="border-b-4 border-black min-w-171"
                :title="object.universalTitle()"
              />
              <img
                v-else
                src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found.png"
                alt="poster"
                class="border-b-4 border-black"
                :title="object.universalTitle()"
              />
              <h2 v-if="object.universalTitle" class="h-10 m-2 font-semibold">
                {{ object.universalTitle() }}
              </h2>
              <h3
                v-if="
                  object.universalDate &&
                  (object?.release_date || object?.first_air_date)
                "
              >
                {{ $t("releaseDate") }} {{ object.universalDate() }}
              </h3>
              <h3 v-else>{{ $t("notAvailable") }}</h3>
              <Review
                :rate="object.vote_average"
                class="m-4 text-red-700 text-xl"
              />
            </div>
          </router-link>
        </div>
      </div>
    </infinite-scroll>
  </div>
</template>

<script>
import InfiniteScroll from "infinite-loading-vue3";
import Review from "./Review.vue";
import { metatagServices } from "../services/metatagServices";
import { listServices } from "../services/listServices";

export default {
  components: { Review, InfiniteScroll },
  data() {
    return {
      index: 0,
      listServices,
      metatagServices,
      contents: [],
      full: false,
      message: "",
    };
  },

  methods: {
    loadData() {
      this.$i18n.locale = this.$route.params.lang;

      if (listServices.full(this.index)) return;

      this.index += 1;
      listServices
        .loadMore(this.index, this.$route.params.type, this.$route.params.lang)
        .then((data) => {
          this.contents = [...this.contents, ...data];
        });
    },
  },

  mounted() {
    metatagServices.changeTitle("MovieDataBase");
    this.loadData();
  },

  watch: {
    $route: {
      handler(newRoute) {
        if (newRoute.name !== "list") return;
        this.index = 0;
        this.contents = [];
        this.loadData();
      },
      deep: true,
    },
  },
};
</script>
