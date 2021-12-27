<template>
  <div>
    <div v-if="news.length">
      <!-- 하위 component인 NewsListRow에 데이터 전달(props) -->
      <news-list-row
        v-for="(article, index) in news.slice(0,5)"
        :key="index"
        :article="article"
      />
    </div>
    <div v-else class="text-center">뉴스가 없습니다.</div>
  </div>
</template>

<script>
import NewsListRow from "@/components/news/NewsListRow.vue";
import { mapState } from "vuex";

const newsStore = "newsStore";

export default {
  name: "NewsList",
  components: {
    NewsListRow,
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {},
  computed: {
    ...mapState(newsStore, ["news"]),
  },
};
</script>

<style scope>
.news-list-container {
  width: 100%;
}
.title {
  margin-top: 0px;
}
</style>
