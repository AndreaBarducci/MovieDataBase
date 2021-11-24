<template>
  <div>
    <select
      v-model="$i18n.locale"
      @change="changeLang($event)"
      
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
      <option v-for="(lang, i) in langs" :key="`lang-${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "LanguageSwitcher",
  data() {
    return {
      langs: ["en", "it", "fr"],
      selectedLang: " ",
    };
  },

  methods: {
    changeLang(event) {
      this.selectedLang = event.target.value;
    },
  },

  watch: {
    selectedLang: function () {
      if (this.$route.params.id === undefined) {
        this.$router.push(
          `/${this.selectedLang}/list/${this.$route.params.type}`
        );
      } else {
        this.$router.push(
          `/${this.selectedLang}/about/${this.$route.params.type}/${this.$route.params.id}`
        );
      }
    },
  },
};
</script>
