<template>
  <div>
    <!-- 로그인 했을 때, -->
    <md-list v-if="userInfo">
      <md-list-item>
        <a class="md-list-item-router md-list-item-container md-button-clean dropdown">
          <div class="md-list-item-content" style="font-size:18px;">{{ userInfo.nickname }} 님</div>
        </a>
      </md-list-item>
      <md-list-item>
        <a
          class="md-list-item-router md-list-item-container md-button-clean dropdown"
          @click="onClickLogout()"
        >
          <div class="md-list-item-content">
            <i class="material-icons">logout</i>
            <p>Logout</p>
          </div>
        </a>
      </md-list-item>
    </md-list>

    <!-- 로그인 안했을 때, -->
    <div v-else>
      <a
        class="md-list-item-router md-list-item-container md-button-clean dropdown"
        @click="classicModal = true"
      >
        <div class="md-list-item-content">
          <i class="material-icons">login</i>
          <p>Login</p>
        </div>
      </a>
      <modal v-if="classicModal" @close="classicModalHide">
        <template slot="body">
          <login-n-register></login-n-register>
        </template>

        <template slot="footer">
          <md-button id="member-modal-btn" class="md-danger md-simple" @click="classicModalHide"
            >Close</md-button
          >
        </template>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import LoginNRegister from "@/components/member/LoginNRegister.vue";
import Modal from "@/components/member/Modal.vue";

const memberStore = "memberStore";

export default {
  name: "MainNavbarMember",
  components: {
    Modal,
    LoginNRegister,
  },
  data() {
    return {
      classicModal: "",
    };
  },
  methods: {
    classicModalHide() {
      this.classicModal = false;
    },
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
};
</script>

<style scoped></style>
