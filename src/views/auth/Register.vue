<template>
  <v-auth
    authFor="register"
    placeholder="Enter your username..."
    :errorMessage="errorMessage"
    :successMessage="successMessage"
  >
    <template #button>Sign up</template>
    <template #link>
      Already have an account?
      <router-link :to="{ name: 'login' }">Login</router-link>
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