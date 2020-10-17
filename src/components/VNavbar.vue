<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'home' }"
          >code highligter</router-link
        >

        <a
          @click="showMenu"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': isActive }"
      >
        <!-- <div class="navbar-start"></div> -->

        <div class="navbar-end">
          <router-link class="navbar-item mr-2" :to="{ name: 'home' }"
            >Home</router-link
          >
          <router-link class="navbar-item mr-2" :to="{ name: 'code' }"
            >Code</router-link
          >
          <div class="buttons">
            <button @click="handleLogout" class="button is-light">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "v-navbar",
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    showMenu() {
      if (this.isActive == false) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
    handleLogout() {
      swal({
        title: "Logout",
        text: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willLogout) => {
        if (willLogout) {
          this.$router.push({ name: "logout" });
        }
      });
    },
  },
};
</script>

<style  scoped>
.navbar {
  min-height: 4rem !important;
  background-color: #12aadc;
}

.navbar-end .navbar-item {
  color: white;
}
.navbar-brand .navbar-item {
  color: white;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
}
</style>