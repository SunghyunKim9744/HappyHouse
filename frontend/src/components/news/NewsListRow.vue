<template>
  <div>
    <b-card
      style="
  margin: 0 auto; width: 80%; height:50%"
    >
      <b-row no-gutters>
        <b-col md="3" v-html="article.title"></b-col>
        <b-col md="9">
          <a :href="article.link">
            <b-card-text v-html="article.description"></b-card-text>
          </a>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const newsStore = "newsStore";

export default {
  name: "NewsListRow",
  bodyClass: "login-page",
  components: {},
  props: {
    article: Object,
  },
  data() {
    return {
      isModal: false,
      isColor: false,
      title: "",
    };
  },
  computed: {
    ...mapState(newsStore, ["news"]),
  },
  methods: {
    ...mapMutations(newsStore, ["NEWS_MODALOPEN"]),
    newsModalOpen() {
      this.NEWS_MODALOPEN(this.itemIndex);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style scoped>
.mouse-over {
  background-color: #92cf94;
  cursor: pointer;
}
</style>
