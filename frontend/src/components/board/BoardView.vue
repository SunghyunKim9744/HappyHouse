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
                <h3 class="card-title" style="color: white;">DETAIL</h3>
              </div>
            </div>
          </div>
          <!------------ modal-header end ------------>

          <!------------ modal-body ------------>
          <div
            class="modal-body text-center"
            style="display:grid; grid-template-rows:90% 10%;"
          >
            <div class="mb-1">
              <!-- <div class="article-header">
                <div>
                <b-card
                  :header-html="
                    `<h3>${article.title}</h3></h3><div><h6>작성자 : ${article.writer}</div><div>${article.regtime}</h6> 　조회 : ${article.hit}</div> ${article.content}`
                  "
                  class="mb-2"
                  style="background-color:#EFF8EF"
                >
                  <b-card-body class="text-left" >
                    <div v-html="message"></div>
                  </b-card-body>
                </b-card>
              </div>
                <div class="article-title">
                  <h3>{{ article.title }}</h3>
                </div>
                <div class="article-info">
                  <div>작성자 : {{ article.writer }}</div>
                  <div>{{ article.regtime }} 조회 : {{ article.hit }}</div>
                </div>
              </div>
              <div class="article-content">{{ article.content }}</div> -->
              <div header-color="green">
                <h4 class="card-title">{{ article.title }}</h4>
                <div class="description">
                  <div>작성자 : {{ article.writer }}</div>
                  <div>{{ article.regtime }} 조회 : {{ article.hit }}</div>
                </div>
                <div class="card-body" style="text-align: left; padding-top:20px; padding-left:20px">
                  {{ article.content }}
                </div>
              </div>
            </div>
            <div class="mb-1">
              <div class="text-right">
                <md-button
                  variant="outline-info"
                  size="sm"
                  @click="updateValidation()"
                  class="md-success md-round"
                >
                  글수정
                </md-button>
                <md-button
                  variant="outline-danger"
                  size="sm"
                  @click="deleteValidation()"
                  class="md-success md-round"
                >
                  글삭제
                </md-button>
              </div>
            </div>
          </div>

          <!------------ modal-body end ------------>

          <!------------ modal-footer ------------>
          <div class="modal-footer">
            <md-button class="md-danger md-simple" @click="[viewModalHide()]">
              Close
            </md-button>
          </div>
          <!------------ modal-footer end ------------>
        </div>
      </div>

      <!-- BoardUpdate Modal -->
      <!-- <board-update
        v-if="isModal"
        @close="isModalHide"
        @isModalHide="isModalHide"
        :boardId="boardId"
      /> -->
    </div>
  </transition>
</template>

<script>
// import moment from "moment";
import { getArticle, deleteArticle } from "@/api/board";
// import BoardUpdate from "@/components/board/BoardUpdate";
import { mapState, mapMutations } from "vuex";
const boardStore = "boardStore";
const memberStore = "memberStore";

export default {
  name: "BoardView",
  components: {
    // BoardUpdate,
  },
  data() {
    return {
      isModal: false,
      article: {},
    };
  },
  props: {
    // boardId: Number,
  },
  computed: {
    ...mapState(boardStore, ["viewModal", "updateModal", "boardId"]),
    ...mapState(memberStore, ["userInfo"]),

    message() {
      if (this.article.title)
        return this.article.title.split("\n").join("<br>");
      return "";
    },
    // changeDateFormat() {
    //   return moment(new Date(this.article.regtime)).format(
    //     "YYYY.MM.DD hh:mm:ss"
    //   );
    // },
  },
  created() {
    getArticle(
      this.boardId,
      (response) => {
        this.article = response.data;
      },
      (error) => {
        console.log("error", error);
      }
    );
  },
  methods: {
    ...mapMutations(boardStore, ["VIEW_MODALHIDE", "UPDATE_MODALOPEN"]),
    viewModalHide() {
      this.VIEW_MODALHIDE();
    },
    updateModalOpen() {
      this.UPDATE_MODALOPEN(this.boardId);
    },
    listArticle2() {
      this.$router.push({ name: "BoardList" });
    },
    removeArticle() {
      if (confirm("정말로 삭제?")) {
        deleteArticle(this.article.boardId, () => {
          this.VIEW_MODALHIDE();
          // this.$router.push(this.$router.currenRouter);
          this.$router.go(this.$router.currenRouter);
        });
      }
    },
    // onClose() {
    //   this.$emit("isModalHide");
    // },
    onHit() {
      this.$emit("hitChange", this.article.hit);
    },
    isModalHide() {
      this.isModal = false;
    },
    updateValidation() {
      if (this.userInfo) {
        if(this.userInfo.nickname === this.article.writer) {
          this.updateModalOpen();
        } else {
          alert("본인만 수정 가능합니다");
        }
      } else {
        alert("로그인하세요");
      }
    },
    deleteValidation() {
      if (this.userInfo) {
        if(this.userInfo.nickname === this.article.writer) {
          this.removeArticle();
        } else {
          alert("본인만 삭제 가능합니다");
        }
      } else {
        alert("로그인하세요");
      }
    },
  },
};
</script>

<style lang="scss">
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
</style>
