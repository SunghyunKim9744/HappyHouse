<template>
  <section id="news" class="news">
    <div class="container-fluid justify-content-center" data-aos="fade-up">
      <div class="section-title ">
        <h2>NEWS</h2>
        <news-search-form />
      </div>
    </div>
    <div class="container justify-content-center md-layout">
      <news-list v-if="isSearch" />
    </div>
  </section>
</template>

<script>
// import News from "@/api/news.js";
import { mapState } from "vuex";
import NewsSearchForm from "@/components/news/NewsSearchForm.vue";
import NewsList from "@/components/news/NewsList.vue";
const newsStore = "newsStore";

export default {
  name: "News",
  components: { NewsSearchForm, NewsList },
  computed: {
    ...mapState(newsStore, ["isSearch"]),
  },
};
</script>

<style scoped>
#news {
  --background-image: url("../assets/img/cool-background.png");
}
.custom-shape-divider-top-1637648621 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-top-1637648621 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 58px;
}

.custom-shape-divider-top-1637648621 .shape-fill {
  fill: #f2efe6;
}
</style>
