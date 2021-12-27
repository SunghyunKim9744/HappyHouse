<template>
  <transition name="modal">
    <div class="modal-mask" style="background-color: transparent;">
      <div class="modal-wrapper">
        <div class="login-modal-container" style="max-width:1500px;" v-click-outside="closeModal">
          <div class="login-modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  methods: {
    closeModal: function() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-mask {
  background-color: transparent;
}
.modal-wrapper {
  width: 100vw;
  height: 95vh;
}
</style>
