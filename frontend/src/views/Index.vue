<template>
  <div id="home" class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <carousel></carousel>
    </parallax>
    <div class="main main-raised">
      <chart></chart>
      <house></house>
      <news></news>
      <board></board>

      <chat></chat>

      <board-modal />
    </div>
  </div>
</template>

<script>
import Chart from "@/views/Chart.vue";
import House from "@/views/House.vue";
import News from "@/views/News.vue";
import Board from "@/views/Board.vue";
import BoardModal from "@/components/board/BoardModal.vue";
import Carousel from "@/components/Carousel.vue";
import Chat from "@/components/chat/Chat.vue";

export default {
  name: "index",

  components: { House, News, Board, Carousel, BoardModal, Chat, Chart },

  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/header-bg1.jpg"),
    },
  },
  data() {
    return {};
  },
  methods: {},

  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`,
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`,
      };
    },
  },
};
</script>
<style scoped lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
</style>
