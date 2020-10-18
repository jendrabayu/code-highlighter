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
                <option
                  v-for="(limit, index) in set.limit"
                  :key="index"
                  :value="limit"
                >
                  {{ limit }}
                </option>
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
                    <option
                      v-for="(sortby, index) in set.sortby"
                      :key="index"
                      :value="sortby"
                    >
                      {{ sortby }}
                    </option>
                  </select>
                </div>
              </li>
              <li>
                <div class="select">
                  <select v-model="sort" @change="getCodes">
                    <option
                      v-for="(sort, index) in set.sort"
                      :key="index"
                      :value="sort"
                    >
                      {{ sort }}
                    </option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <hr class="section_border" />
        <div class="main_content">
          <div v-if="this.$store.state.code.isLoading">
            <v-loading-section />
          </div>
          <div class="py-6" v-show="$store.state.code.codes.length == 0">
            <h1 class="is-size-3 has-text-centered has-text-weight-light">
              Code Not Found!
            </h1>
          </div>
          <div
            v-show="$store.state.code.codes.length != 0"
            class="columns is-multiline py-6"
          >
            <div
              v-for="(code, index) in $store.state.code.codes"
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
import VLoadingSection from "../components/VLoadingSection";

export default {
  components: {
    VNavbar,
    VCodeItem,
    VLoadingSection,
  },
  data() {
    return {
      progress: false,
      limit: 5,
      sortBy: "fileName",
      sort: "ASC",
      isActiveHighlight: 1,
      set: {
        limit: [5, 10, 25, 50, 100, 1000],
        sortby: ["fileName", "lang", "createdAt"],
        sort: ["ASC", "DESC"],
      },
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

.filter_container {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 625px) {
  .filter_container {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter_left {
    margin-bottom: 1rem;
  }
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
</style>