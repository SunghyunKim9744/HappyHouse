<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide :img-src="require('@/assets/img/header-bg1.jpg')"> </b-carousel-slide>
      <b-carousel-slide :img-src="require('@/assets/img/header-bg2.jpg')"> </b-carousel-slide>
      <b-carousel-slide :img-src="require('@/assets/img/header-bg3.jpg')"> </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.slide = slide;
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.slide = slide;
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
.page-header > div {
  width: 100%;
}
</style>
