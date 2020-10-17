<template>
  <div>
    <v-navbar></v-navbar>
    <main>
      <div class="container">
        <nav class="filter_container mt-6">
          <div class="entries_container">
            <p class="mr-2">Show</p>
            <div class="select mr-2">
              <select v-model="limit" @change="getCodes">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="">all</option>
              </select>
            </div>
            <p>entries</p>
          </div>

          <ul>
            <li class="mr-5">Sorted</li>
            <li class="mr-2">
              <div class="select">
                <select v-model="sortBy" @change="getCodes">
                  <option value="fileName">File name</option>
                  <option value="createdAt">Created at</option>
                  <option value="lang">Languange</option>
                </select>
              </div>
            </li>
            <li>
              <div class="select">
                <select v-model="sort" @change="getCodes">
                  <option value="ASC">A-Z</option>
                  <option value="DESC">Z-A</option>
                </select>
              </div>
            </li>
          </ul>
        </nav>
        <hr class="section_border" />
        <div class="main_content">
          <div
            v-if="this.$store.state.code.isLoading"
            class="progress_container"
          >
            <div class="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="columns is-multiline mt-5">
            <div
              v-for="(code, index) in this.$store.state.code.codes"
              :key="index"
              class="column is-6"
              style="height: auto"
            >
              <v-code-item :dataCode="code"></v-code-item>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import VNavbar from "../components/VNavbar";
import VCodeItem from "../components/code/VCodeItem";

export default {
  components: {
    VNavbar,
    VCodeItem,
  },
  data() {
    return {
      progress: false,
      limit: 5,
      sortBy: "fileName",
      sort: "ASC",
      isActiveHighlight: 1,
    };
  },
  created() {
    this.getCodes();
  },
  methods: {
    lala() {
      console.log(this.sortBy);
    },
    getCodes() {
      this.progress = true;
      const data = {
        userId: this.$store.state.user.id,
        filter: {
          page: this.page,
          limit: this.limit,
          sortBy: this.sortBy,
          sort: this.sort,
          highlighted: this.isActiveHighlight,
        },
      };
      this.$store.dispatch("code/getList", data);
      this.progress = false;
    },
  },
  beforeCreate() {
    document.body.className = "";
  },
};
</script>

<style scoped>
main {
  min-height: 100vh;
}

.entries_container {
  display: flex;
  align-items: center;
}

.progress_container {
  padding: 100px 0;
  position: absolute;
  background-color: white;
  height: 100%;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter_container {
  display: flex;
  justify-content: space-between;
}

.main_content {
  position: relative;
}

.section_border {
  margin-top: 0.8rem;
  border: 1px solid red;
}

.filter_container ul {
  display: flex;
  align-items: center;
}

.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #12aadc;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>