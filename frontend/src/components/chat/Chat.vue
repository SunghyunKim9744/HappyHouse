<template>
  <div>
    <input type="checkbox" id="check" @click="connected()" />
    <label class="chat-btn" for="check">
      <b-icon icon="chat" class="comment"></b-icon>
      <b-icon icon="chat" class="close"></b-icon>
    </label>

    <div class="wrapper" v-if="userInfo">
      <div class="main">
        <div id="start" class="px-2 scroll"></div>
        <nav class="navbar bg-white navbar-expand-sm d-flex justify-content-between">
          <input
            type="text number"
            name="text"
            class="form-control"
            placeholder="Type a message..."
            v-model="message"
            @keyup.enter="sendMessage()"
          />
          <div class="icondiv d-flex justify-content-end align-content-center text-center ml-2">
            <i class="fa fa-arrow-circle-right icon2" @click="sendMessage()"></i>
          </div>
        </nav>
      </div>
    </div>
    <div class="wrapper" v-else>
      <div class="main">
        <span style="margin-left : 100px;">로그인하세요</span>
      </div>
    </div>
  </div>
</template>

<script>
import ChatSocket from "@/components/chat/ChatSocket.js";
import { mapState } from "vuex";
const memberStore = "memberStore";
export default {
  name: "Chat",
  data() {
    return {
      isConnected: false,
      message: "",
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    connected() {
      if (!this.isConnected && this.userInfo) {
        this.isConnected = true;
        ChatSocket.connect(this.userInfo.nickname);
      }
    },
    sendMessage() {
      if (this.message != "") ChatSocket.sendMessage(this.userInfo.nickname, this.message);
      this.message = "";
    },
  },
};
</script>

<style scoped>
body {
  background-color: #eee;
}

.chat-btn {
  position: fixed;
  right: 14px;
  bottom: 30px;
  cursor: pointer;
}

.chat-btn .close {
  display: none;
}

.chat-btn i {
  transition: all 0.9s ease;
}

#check:checked ~ .chat-btn i {
  display: block;
  pointer-events: auto;
  transform: rotate(180deg);
}

.chat-btn i {
  font-size: 22px;
  color: #fff !important;
}

.chat-btn {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: rgb(114, 114, 172);
  color: #fff;
  font-size: 22px;
  border: none;
  margin-right: 3%;
}

.wrapper {
  position: fixed;
  right: 20px;
  margin-right: 3%;
  bottom: 100px;
  width: 300px;
  background-color: #fff;
  border-radius: 5px;
  opacity: 0;
  transition: all 0.4s;
}

#check:checked ~ .wrapper {
  opacity: 1;
}

.header {
  padding: 13px;
  background-color: blue;
  border-radius: 5px 5px 0px 0px;
  margin-bottom: 10px;
  color: #fff;
}

.chat-form {
  padding: 15px;
}

.chat-form input,
textarea,
button {
  margin-bottom: 10px;
}

.chat-form textarea {
  resize: none;
}

.form-control:focus,
.btn:focus {
  box-shadow: none;
}

.btn,
.btn:focus,
.btn:hover {
  background-color: blue;
  border: blue;
}

#check {
  display: none !important;
}
body {
  background-color: #fff;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #eee;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #651fff;
}

.main {
  background-color: #eee;
  width: 320px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 6px 0px 0px 0px;
}

.scroll {
  overflow-y: scroll;
  scroll-behavior: smooth;
  height: 325px;
}

.img1 {
  border-radius: 50%;
  background-color: #66bb6a;
}

.name {
  font-size: 8px;
}

.msg {
  background-color: #fff;
  font-size: 11px;
  padding: 5px;
  border-radius: 5px;
  font-weight: 500;
  color: #3e3c3c;
}

.between {
  font-size: 20px;
  font-weight: 500;
  color: #a09e9e;
}

.navbar {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.form-control {
  font-size: 12px;
  font-weight: 400;
  width: 230px;
  height: 30px;
  border: none;
}

form-control:focus {
  box-shadow: none;
  overflow: hidden;
  border: none;
}

.form-control:focus {
  box-shadow: none !important;
}

.icon1 {
  color: #7c4dff !important;
  font-size: 18px !important;
  cursor: pointer;
}

.icon2 {
  color: #512da8 !important;
  font-size: 18px !important;
  position: relative;
  left: 8px;
  padding: 0px;
  cursor: pointer;
}

.icondiv {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  padding: 2px;
  position: relative;
  bottom: 1px;
}
</style>
