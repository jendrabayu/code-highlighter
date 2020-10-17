<template>
  <v-auth
    authFor="login"
    placeholder="Enter your username..."
    :errorMessage="errorMessage"
    :successMessage="successMessage"
  >
    <template #button>Login</template>
    <template #link>
      Don’t have an account?
      <router-link :to="{ name: 'register' }">Sign up</router-link>
    </template>
  </v-auth>
</template>

<script>
import VAuth from "../../components/VAuth";
export default {
  components: {
    VAuth,
  },
  props: {
    errorMessage: {
      type: String,
    },
    successMessage: {
      type: String,
    },
  },

};
</script>