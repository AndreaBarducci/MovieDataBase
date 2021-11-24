<template>
  <div class="about">
    <MovieDetails v-if="$route.params.type !== 'person'"/>
    <ActorDetails v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import ActorDetails from "@/components/ActorDetails.vue"
import MovieDetails from "@/components/MovieDetails.vue";

export default {
  name: "Details",
  components: {
    MovieDetails,
    ActorDetails
  },
};
</script>
