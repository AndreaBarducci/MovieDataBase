<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style>
@import "./assets/css/fontawesome.css";
@import "./assets/css/style.css";
@import "./assets/css/all.css";
</style>