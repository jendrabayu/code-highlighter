<template>
  <nav
    class="navbar is-info py-2"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <router-link
          class="navbar-item is-uppercase is-size-5 has-text-weight-medium"
          :to="{ name: 'home' }"
          >code highlighter</router-link
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
        <div class="navbar-end">
          <router-link class="navbar-item mr-2" :to="{ name: 'home' }"
            >Home</router-link
          >
          <router-link class="navbar-item mr-2" :to="{ name: 'code' }"
            >Code</router-link
          >
          <div class="buttons">
            <button @click="handleLogout" class="button is-danger">
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
