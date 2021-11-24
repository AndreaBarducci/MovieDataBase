<template>
  <div class="home">
    <ContentList />
  </div>
</template>

<script>
// @ is an alias to /src
import ContentList from "@/components/ContentList.vue";

export default {
  name: "Home",
  components: {
    ContentList,
  },
};
</script>
