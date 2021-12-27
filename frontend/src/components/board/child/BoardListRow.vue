<template>
  <b-tr>
    <b-td>{{ boardId }}</b-td>
    <!-- title click시 Modal 보임 -->
    <b-td
      @click="viewModalOpen()"
      @mouseover="colorChange(true)"
      @mouseout="colorChange(false)"
      :class="{ 'mouse-over': isColor }"
    >
      {{ title }}
    </b-td>
    <b-td>{{ changedHit }}</b-td>
    <b-td>{{ writer }}</b-td>
    <b-td>{{ regtime }}</b-td>

    <!-- BoardView Modal -->
    <!-- <board-view
      v-if="isModal"
      @close="isModalHide"
      @isModalHide="isModalHide"
      @hitChange="hitChange"
      :boardId="boardId"
    /> -->
  </b-tr>
</template>

<script>
// import moment from "moment";
// import BoardView from "@/components/board/BoardView";
import { mapState, mapMutations } from "vuex";
const boardStore = "boardStore";

export default {
  name: "BoardListRow",
  components: {
    // BoardView,
  },
  data() {
    return {
      isModal: false,
      isColor: false,
      changedHit: 0,
    };
  },
  computed: {
    ...mapState(boardStore, ["viewModal"]),
    // changeDateFormat() {
    //   return moment(new Date(this.regtime)).format("YY.MM.DD hh:mm:ss");
    // },
  },
  created() {
    console.log("몇번");
    this.changedHit = this.hit;
  },
  props: {
    boardId: Number,
    writer: String,
    title: String,
    hit: Number,
    regtime: String,
  },
  methods: {
    ...mapMutations(boardStore, ["VIEW_MODALOPEN"]),
    viewModalOpen() {
      this.hitChange();
      this.VIEW_MODALOPEN(this.boardId);
    },
    // isModalHide() {
    //   this.isModal = false;
    // },
    // setHit() {
    //   this.SET_HIT(this.hit);
    // },
    colorChange(flag) {
      this.isColor = flag;
    },
    hitChange() {
      this.changedHit = this.changedHit + 1;
    },
  },
};
</script>

<style scoped>
.mouse-over {
  background-color: #92CF94;
  cursor: pointer;
}
</style>
