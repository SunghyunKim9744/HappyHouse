<template>
  <div style="text-align: left; position:relative; height: 100%;">
    <form
      @submit="onSubmit"
      @reset="onReset"
      style="position:relative; display: grid; height: 100%; grid-template-rows: 15% 15% 70%;"
    >
      <div class="md-theme-default" style="position:relative;">
        <md-field>
          <label>작성자</label>
          <md-input
            v-if="this.type === 'register'"
            id="writer"
            :disabled="true"
            v-model="userInfo.nickname"
            type="text"
            required
          />
          <md-input
            v-else
            id="writer"
            :disabled="true"
            v-model="article.writer"
            type="text"
            required
          />
        </md-field>
      </div>
      <div class="md-theme-default" style="position:relative;">
        <md-field>
          <label>제목</label>
          <md-input id="title" v-model="article.title" type="text" required />
        </md-field>
      </div>
      <div class="md-theme-default" style="position:relative;">
        <md-field>
          <label>내용</label>
          <md-textarea
            id="writer"
            v-model="article.content"
            required
          ></md-textarea>
          <!-- <text-editor-tiptap /> -->
        </md-field>
      </div>

      <div style="padding-top:30px">
        <md-button
          type="submit"
          variant="primary"
          class="md-success md-round"
          style="margin-right: 10px;"
          v-if="this.type === 'register'"
        >
          글작성
        </md-button>
        <md-button
          type="submit"
          variant="primary"
          class="md-success md-round"
          style="margin-right: 10px;"
          v-else
        >
          글수정
        </md-button>
        <md-button
          type="reset"
          variant="danger"
          class="md-success md-round"
          style="margin-right: 10px;"
        >
          초기화
        </md-button>
      </div>
    </form>
  </div>
</template>

<script>
import { writeArticle, getArticle, modifyArticle } from "@/api/board";
import { mapState, mapMutations } from "vuex";
// import TextEditorTiptap from "@/components/board/TextEditorTiptap.vue"
const boardStore = "boardStore";
const memberStore = "memberStore";

export default {
  name: "BoardWriteForm",
  data() {
    return {
      article: {
        boardId: 0,
        writer: "",
        title: "",
        content: "",
      },
      isWriter: false,
    };
  },
  props: {
    boardId: Number,
    type: { type: String },
  },
  components: {
    // TextEditorTiptap
  },
  created() {
    if (this.type === "modify") {
      getArticle(
        this.boardId,
        ({ data }) => {
          // this.article.boardId = data.article.boardId;
          // this.article.writer = data.article.writer;
          // this.article.title = data.article.title;
          // this.article.content = data.article.content;
          this.article = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.isWriter = true;
    }
  },
  methods: {
    ...mapMutations(boardStore, [
      "WRITE_MODALHIDE",
      "UPDATE_MODALHIDE",
      "VIEW_MODALHIDE",
    ]),

    onSubmit(event) {
      event.preventDefault();
      console.log(this.article.writer);
      console.log(this.userInfo.nickname);
      this.article.writer = this.userInfo.nickname;

      let err = true;
      let msg = "";
      !this.article.writer &&
        ((msg = "작성자 입력해주세요"),
        (err = false),
        this.$refs.writer.focus());
      err &&
        !this.article.title &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else {
        // this.type === "register" ? this.registArticle() : this.updateArticle();
        if (this.type === "register") {
          console.log("regist");
          this.registArticle();
        } else {
          console.log("update");
          this.updateArticle();
          this.$router.go(this.$router.currenRouter);
        }
      }
    },
    onReset(event) {
      event.preventDefault();
      this.article.boardId = 0;
      this.article.title = "";
      this.article.content = "";
      // this.$router.push({ name: "BoardList" });
    },
    registArticle() {
      writeArticle(
        {
          writer: this.article.writer,
          title: this.article.title,
          content: this.article.content,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.WRITE_MODALHIDE();
          this.$router.go(this.$router.currenRouter);
          // this.$router.push({ name: "BoardList" });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    updateArticle() {
      modifyArticle(
        {
          boardId: this.article.boardId,
          writer: this.article.writer,
          title: this.article.title,
          content: this.article.content,
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.VIEW_MODALHIDE();
          this.UPDATE_MODALHIDE();
          this.$router.go(this.$router.currenRouter);
          // this.$router.push({ name: "BoardList" });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    checkValidation() {
      if (this.userInfo) {
        this.article.writer = this.userInfo.nickname;
        this.writeModalOpen();
      } else {
        alert("로그인하세요");
      }
    },
  },
  computed: {
    ...mapState(boardStore, ["writeModal"]),
    ...mapState(memberStore, ["userInfo"]),
  },
};
</script>

<style></style>
