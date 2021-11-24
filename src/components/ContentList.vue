<template>
<div>
  <MovieTvList v-if="$route.params.type !== 'person'" />
  <ActorList v-else />
</div>
</template>

<script>
import ActorList from "./ActorList.vue"
import MovieTvList from "./MovieTvList.vue"
export default {
  components: { MovieTvList,ActorList },

  
};
</script>
