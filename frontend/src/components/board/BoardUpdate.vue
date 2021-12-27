<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <!------------ modal-header ------------>
          <div class="modal-headr">
            <div>
              <div
                class="alert alert-success"
                style="text-align:center; color: white;"
              >
                <h3 class="card-title" style="color: white;">UPDATE</h3>
              </div>
            </div>
          </div>
          <!------------ modal-header end ------------>

          <!------------ modal-body ------------>
          <div class="modal-body">
            <board-write-form type="modify" :boardId="boardId" />
          </div>
          <!------------ modal-body end ------------>

          <!------------ modal-footer ------------>
          <div class="modal-footer">
            <md-button class="md-danger md-simple" @click="[updateModalHide()]">
              Close
            </md-button>
          </div>
          <!------------ modal-footer end ------------>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BoardWriteForm from "./child/BoardWriteForm.vue";
import { mapState, mapMutations } from "vuex";
const boardStore = "boardStore";

export default {
  name: "BoardUpdate",
  components: {
    BoardWriteForm,
  },
  computed: {
    ...mapState(boardStore, ["updateModal", "boardId"]),
  },
  // props: {
  //   boardId: Number,
  // },
  methods: {
    ...mapMutations(boardStore, ["UPDATE_MODALHIDE"]),
    updateModalHide() {
      this.UPDATE_MODALHIDE();
    },
    // onClose() {
    //   this.$emit("isModalHide");
    // },
  },
};
</script>

<style></style>
