<template>
  <div class="register">
    <div class="row">
      <div class="col-md-3 register-left">
        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
        <h3>Welcome</h3>
      </div>
      <div class="col-md-9 register-right">
        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="login-tab"
              data-toggle="tab"
              href="#login"
              role="tab"
              aria-controls="login"
              aria-selected="true"
              >LOGIN</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="register-tab"
              data-toggle="tab"
              href="#register"
              role="tab"
              aria-controls="register"
              aria-selected="false"
              >REGISTER</a
            >
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="login"
            role="tabpanel"
            aria-labelledby="login-tab"
          >
            <h3 class="register-heading">LOGIN</h3>
            <div class="row register-form">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ID *"
                    v-model="member.nickname"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password *"
                    v-model="member.password"
                  />
                </div>

                <div class="d-flex justify-content-center">
                  <b-button pill variant="primary" size="mg" @click="confirm()">LOGIN</b-button>
                </div>
              </div>
            </div>
          </div>

          <!-- REGISTER -->
          <div
            class="tab-pane fade show"
            id="register"
            role="tabpanel"
            aria-labelledby="register-tab"
          >
            <h3 class="register-heading">REGISTER</h3>
            <div class="row register-form">
              <div class="col-md-12">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="ID *" value="" />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password *"
                    v-model="member.password"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password *"
                    v-model="member.password"
                  />
                </div>
                <div class="form-group">
                  <input type="email" class="form-control" placeholder="Email *" value="" />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    maxlength="10"
                    minlength="10"
                    class="form-control"
                    placeholder="Phone *"
                    value=""
                  />
                </div>
                <div class="d-flex justify-content-center">
                  <b-button pill variant="primary" size="lg">REGISTER</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  name: "LoginNRegister",
  data() {
    return {
      member: {
        nickname: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.member);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        document.querySelector("#member-modal-btn").click();
      } else {
        alert("아이디 또는 비밀번호를 확인하세요.");
      }
    },
  },
};
</script>

<style scoped>
.register {
  background: -webkit-linear-gradient(left, #3931af, #00c6ff);
  margin-top: 3%;
  padding: 3%;
}
.register-left {
  text-align: center;
  color: #fff;
  margin-top: 4%;
}
.register-left input {
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  width: 60%;
  background: #f8f9fa;
  font-weight: bold;
  color: #383d41;
  margin-top: 30%;
  margin-bottom: 3%;
  cursor: pointer;
}
.register-right {
  background: #f8f9fa;
  border-top-left-radius: 10% 50%;
  border-bottom-left-radius: 10% 50%;
}
.register-left img {
  margin-top: 35%;
  margin-bottom: 5%;
  width: 25%;
  -webkit-animation: mover 2s infinite alternate;
  animation: mover 1s infinite alternate;
}
@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
@keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
.register-left p {
  font-weight: lighter;
  padding: 12%;
  margin-top: -9%;
}
.register .register-form {
  padding: 10%;
  margin-top: 10%;
}
.btnRegister {
  float: right;
  margin-top: 10%;
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  background: #0062cc;
  color: #fff;
  font-weight: 600;
  width: 50%;
  cursor: pointer;
}
.register .nav-tabs {
  margin-top: 3%;
  border: none;
  background: #0062cc;
  border-radius: 1.5rem;
  width: 28%;
  float: right;
}
.register .nav-tabs .nav-link {
  padding: 5%;
  padding-left: 25%;
  height: 34px;
  font-weight: 600;
  color: #fff;
  border-top-right-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}
.register .nav-tabs .nav-link:hover {
  border: none;
}
.register .nav-tabs .nav-link.active {
  width: 100px;
  color: #0062cc;
  border: 2px solid #0062cc;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
}
.register-heading {
  text-align: center;
  margin-top: 8%;
  margin-bottom: -15%;
  color: #495057;
}
</style>
