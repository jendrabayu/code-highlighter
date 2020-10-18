<template>
  <div>
    <v-navbar></v-navbar>
    <main class="px-5">
      <div class="container">
        <nav class="filter_container mt-6">
          <div class="filter_left">
            <p class="mr-2">Show</p>
            <div class="select mr-2">
              <select v-model="limit" @change="getCodes">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
              </select>
            </div>
            <p>entries</p>
          </div>
          <div class="filter_right">
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
          </div>
        </nav>
        <hr class="section_border" />
        <div class="main_content">
          <div
            v-if="this.$store.state.code.isLoading"
            class="progress_container"
          >
            <div class="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
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
  beforeCreate() {
    document.body.className = "";
  },
  created() {
    this.getCodes();
  },
  methods: {
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
};
</script>

<style scoped>
main {
  min-height: 100vh;
}

.filter_left {
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

@media (max-width: 625px) {
}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #3298dc;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>