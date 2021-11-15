<template>
  <div>
    <br />
    <br />
    <i v-for="star in stars" :class="star" :key="star.id"></i>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    rate: Number,
  },
  computed: {
    stars() {
      const rating = Math.round(this.rate);
      const emptyStars = new Array(5).fill("far fa-star");
      let x = Math.floor(rating / 2);
      let i = 0;
      for (i; i < x; i++) {
        emptyStars[i] = "fas fa-star";
      }
      if (rating % 2 != 0) {
        emptyStars[i] = "fas fa-star-half-alt";
      }

      return emptyStars;
    },
  },
};
</script>

