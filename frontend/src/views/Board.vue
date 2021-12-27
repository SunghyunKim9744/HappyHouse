<template>
  <section id="board" class="board">
    <div class="container-fluid justify-content-center" data-aos="fade-up">
      <div class="section-title ">
        <h2>Board</h2>
      </div>
    </div>

    <div class="container justify-content-center md-layout">
      <board-list />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import BoardList from "@/components/board/BoardList.vue";

const boardStore = "boardStore";

export default {
  name: "Board",
  components: { BoardList },
  computed: {
    ...mapState(boardStore),
  },
};
</script>

<style></style>
