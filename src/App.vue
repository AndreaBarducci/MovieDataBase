<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <div>
        <NavBar />
        <component :is="Component" />
      </div>
    </keep-alive>
  </router-view>
</template>
<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
};
</script>
<style>
@import "./assets/css/fontawesome.css";
@import "./assets/css/all.css";
</style>
