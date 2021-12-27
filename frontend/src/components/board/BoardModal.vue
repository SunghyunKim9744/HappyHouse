<template>
  <div>
    <board-view v-if="viewModal" />
    <board-write v-if="writeModal" />
    <board-update v-if="updateModal" />
  </div>
</template>

<script>
import BoardView from "@/components/board/BoardView";
import BoardWrite from "@/components/board/BoardWrite";
import BoardUpdate from "@/components/board/BoardUpdate";
import { mapState, mapMutations } from "vuex";
const boardStore = "boardStore";

export default {
  name: "BoardModal",
  components: {
    BoardView,
    BoardWrite,
    BoardUpdate,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(boardStore, ["viewModal", "writeModal", "updateModal"]),
  },
  // methods: {
  //   ...mapMutations(boardStore, ["VIEW_MODALHIDE", "WRITE_MODALHIDE"]),
  //   viewModalHide() {
  //     this.VIEW_MODALHIDE();
  //   },
  //   writeModalHide() {
  //     this.WRITE_MODALHIDE();
  //   },
  // },
};
</script>

<style scope></style>
