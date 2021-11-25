<template>
  <div
    class="
      flex flex-wrap
      items-center
      bg-gradient-to-r
      from-red-900
      via-pink-500
      to-purple-900
      h-auto
      sticky
      top-0
      border-b-4 border-black
    "
  >
    <div>
      <h1
        class="
          ml-2
          mx-auto
          font-bold
          text-3xl text-transparent
          bg-clip-text bg-gradient-to-br
          from-white
          via-blue-500
          to-indigo-600
        "
      >
        MovieDataBaseMDB
      </h1>
    </div>
    <div class="my-4 mx-auto">
      <router-link
        as="button"
        :to="{
          name: 'list',
          params: { type: 'movie', lang: $route.params?.lang ?? 'en' },
        }"
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
          focus:bg-white focus:text-blue-700
        "
      >
        {{ $t("movieButton") }}
      </router-link>
      <router-link
        as="button"
        :to="{
          name: 'list',
          params: { type: 'tv', lang: $route.params?.lang ?? 'en' },
        }"
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
          focus:bg-white focus:text-blue-700
        "
      >
        {{ $t("tvButton") }}
      </router-link>

      <router-link
        as="button"
        :to="{
          name: 'list',
          params: { type: 'person', lang: $route.params?.lang ?? 'en' },
        }"
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
          focus:bg-white focus:text-blue-700
        "
      >
        {{ $t("actors") }}
      </router-link>
    </div>
    <div class="relative flex flex-row mx-auto">
      <div class="m-2 align-middle">
        <input
          ref="searchBar"
          type="text"
          class="bg-gray-100 rounded focus:bg-white border w-full p-3 text-xl"
          :placeholder="$t('search')"
          v-model="search"
        />
        <div class="relative" data-dropdown-toggle="dropdown">
          <div
            class="
              absolute
              top-100
              mt-1
              w-full
              border
              bg-white
              shadow-xl
              rounded
            "
          >
            <div class="divide-y" ref="list">
              <template v-for="(object, id) in searchResults" :key="id">
                <router-link
                  @click="search = ''"
                  as="button"
                  :to="{
                    name: 'about',
                    params: {
                      type: object.media_type,
                      id: object.id,
                      lang: $route.params.lang,
                    },
                  }"
                >
                  <a
                    class="
                      {'p-2
                      flex
                      w-full
                      rounded
                      hover:bg-gray-100':
                      true,
                      'bg-blue-500
                      hover:bg-blue-600
                    "
                  >
                    <span>{{ object.title || object.name }}</span>
                  </a>
                </router-link>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <LanguageSwitcher></LanguageSwitcher>
    </div>
  </div>
</template>

<script>
import { listServices } from "../services/listServices";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import Content from "../Classes/Content";

export default {
  components: { LanguageSwitcher },
  data() {
    return {
      Content,
      search: "",
      searchResults: [],
    };
  },
  methods: {
    emptyResults() {
      this.searchResults = [];
    },
    startSearch() {
      listServices
        .search(this.search)
        .then((data) => (this.searchResults = data.results));
    },
    focusSearchBar(event) {
      if (
        (event.key === "k" && event.ctrlKey) ||
        (event.key === "k" && event.metaKey)
      ) {
        event.preventDefault();
        this.$refs.searchBar.focus();
      }

      if (event.key === "Escape") {
        this.search = "";
        this.$refs.searchBar.blur();
        this.emptyResults();
      }
    },

    toggle() {
      if (this.$refs.searchBar.blur) {
        this.search = "";
        this.emptyResults();
      }
    },
  },

  created() {
    window.addEventListener("keydown", this.focusSearchBar);
    window.addEventListener("click", this.toggle);
  },

  watch: {
    search: {
      handler() {
        if (this.search) {
          this.startSearch();
        }
      },
    },
  },
};
</script>
