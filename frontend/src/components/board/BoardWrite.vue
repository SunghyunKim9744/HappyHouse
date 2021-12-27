<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <!------------ modal-header ------------>
          <div class="modal-headr">
            <div>
              <div class="alert alert-success" style="text-align:center; color: white;">
                <h3 class="card-title" style="color: white;">WRITE</h3>
              </div>
            </div>
          </div>
          <!------------ modal-header end ------------>

          <!------------ modal-body ------------>
          <div class="modal-body">
            <!-- BoardWriteForm Component -->
            <board-write-form type="register" />
          </div>
          <!------------ modal-body end ------------>

          <!------------ modal-footer ------------>
          <div class="modal-footer">
            <md-button class="md-danger md-simple" @click="writeModalHide()">
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
  name: "BoardWrite",
  components: {
    BoardWriteForm,
  },
  computed: {
    ...mapState(boardStore, ["writeModal"]),
  },
  methods: {
    ...mapMutations(boardStore, ["WRITE_MODALHIDE"]),
    writeModalHide() {
      this.WRITE_MODALHIDE();
    }
    // onClose() {
    //   this.$emit("isModalHide");
    // },
  },
};
</script>

<style scoped>
.temp {
  background-color: black;
}
</style>
