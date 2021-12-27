<template>
  <div class="md-layout-item" data-aos="fade-up">
    <div class="board-list-container">
      <!-- <b-row>
        <b-col>
          <b-alert show><h3>글목록</h3></b-alert>
        </b-col>
      </b-row> -->
      <b-row class="mb-1">
        <b-col class="text-right">
          <md-button
            variant="outline-primary"
            class="md-success md-round"
            @click="checkValidation()"
          >
            글쓰기
          </md-button>
          <!-- <md-button
            v-else
            variant="outline-primary"
            class="md-success md-round"
            @click="needLogin()"
          >
            글쓰기
          </md-button> -->
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="articles.length">
          <b-table-simple hover responsive>
            <b-thead style="background-color: #92CF94;">
              <b-tr>
                <b-th>글번호</b-th>
                <b-th>제목</b-th>
                <b-th>조회수</b-th>
                <b-th>작성자</b-th>
                <b-th>작성일</b-th>
              </b-tr>
            </b-thead>
            <tbody>
              <!-- 하위 component인 BoardListRow에 데이터 전달(props) -->
              <board-list-row
                v-for="article in paginatedData"
                :key="article.boardId"
                v-bind="article"
              />
            </tbody>
          </b-table-simple>

          <div class="btn-cover">
            <md-button
              class="md-success md-round"
              @click="pageNum >= page ? '#' : prevPage()"
            >
              이전
            </md-button>
            
            <span
              class="page-count"
              style="font-size: 15px; text-align: center; line-height:50px"
            >
              {{ page - pageNum + 1 }} / {{ page }} 페이지
            </span>
            <md-button
              class="md-success md-round"
              @click="pageNum === 1 ? '#' : nextPage()"
            >
              다음
            </md-button>
          </div>
        </b-col>
        <b-col v-else class="text-center">게시글이 없습니다.</b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { listArticle2 } from "@/api/board.js";
import BoardListRow from "@/components/board/child/BoardListRow";
// import { ChevronsLeftIcon, ChevronsRightIcon } from "vue-feather-icons";
import { mapState, mapMutations } from "vuex";
const boardStore = "boardStore";
const memberStore = "memberStore";

export default {
  name: "BoardList",
  components: {
    BoardListRow,
    // ChevronsLeftIcon,
    // ChevronsRightIcon,
  },
  data() {
    return {
      isModal: false,
      articles: [],
      page: 0,
      pageNum: 0,
      pageSize: 10,
    };
  },
  created() {
    listArticle2(
      (response) => {
        this.articles = response.data;

        // page의 수를 세는 작업
        let listLeng = this.articles.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
        if (listLeng % listSize > 0) page += 1;
        /*
          다음 식으로 위의 if문 대체가능
          page = Math.floor((listLeng - 1) / listSize) + 1;
        */
        this.pageNum = page;
        this.page = page;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    ...mapMutations(boardStore, ["WRITE_MODALOPEN"]),
    writeModalOpen() {
      this.WRITE_MODALOPEN();
    },
    nextPage() {
      this.pageNum -= 1;
    },
    prevPage() {
      this.pageNum += 1;
    },
    needLogin() {
      alert("로그인하세요");
    },
    checkValidation() {
      if (this.userInfo) {
        this.writeModalOpen();
      } else {
        alert("로그인하세요");
      }
    },
  },
  computed: {
    ...mapState(boardStore, ["viewModal", "writeModal"]),
    ...mapState(memberStore, ["userInfo"]),

    // 배열 처음부터 끝까지 진행
    // paginatedData() {
    //   const start = this.pageNum * this.pageSize,
    //     end = start + this.pageSize;
    //   return this.articles.slice(start, end);
    // },

    // 배열 끝부터 처음까지 진행
    paginatedData() {
      const start =
          this.articles.length - (this.page - this.pageNum) * this.pageSize,
        end = start - this.pageSize <= 0 ? 0 : start - this.pageSize;
      return this.articles.slice(end, start).reverse();
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
</style>
