<template>
  <div class="bg-gray-400">
    <infinite-scroll
      @infinite-scroll="loadData"
      :noResults="full"
      :message="message"
    >
      <div class="md:flex flex-wrap place-content-center">
        <div
          v-for="(actor, index) in contents"
          :key="index"
          class="m-4 text-center"
        >
       <router-link
         :to="{
              name: 'about',
              params: {
                type: $route.params.type,
                id: actor.id,
                lang: $route.params.lang,
              },
            }"
       > 
          <div class="bg-gray-50 border-8 border-black rounded-xl md:max-w-xs">
            <img
              v-if="actor.profile_path"
              :src="listServices.bindImage(actor.profile_path)"
              alt="poster"
              class="border-b-4 border-black min-w-171"
              :title="actor.name"
            />
            <img
              v-else
              src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found.png"
              alt="poster"
              class="border-b-4 border-black"
              :title="actor.name"
            />
            <h2 class="h-10 m-2 font-semibold">
              {{ actor.name }}
            </h2>
          </div>
       </router-link>
        </div>
      </div>
    </infinite-scroll>
  </div>
</template>

<script>
import InfiniteScroll from "infinite-loading-vue3";
import { metatagServices } from "../services/metatagServices";
import { listServices } from "../services/listServices";

export default {
  components: { InfiniteScroll },
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