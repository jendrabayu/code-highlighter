<template>
  <main class="px-5">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-fifths">
          <header
            class="has-text-centered has-text-weight-light is-size-1-tablet is-size-3-mobile"
          >
            code highlighter
          </header>
          <div id="content">
            <h1
              v-if="authFor == 'login'"
              class="title is-size-3 has-text-weight-light"
            >
              <span class="has-text-weight-bold">Log</span> in
            </h1>
            <h1
              v-else-if="authFor == 'register'"
              class="title is-size-3 has-text-weight-light"
            >
              <span class="has-text-weight-bold">Sign</span> up
            </h1>
            <ValidationObserver v-slot="{ handleSubmit }" ref="form">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <v-alert-message
                  v-show="message.error || message.success"
                  :color="alertColor"
                  :message="alertMessage"
                  @close="clearMessage"
                />
                <ValidationProvider
                  name="username"
                  rules="required|min:3"
                  v-slot="{ errors }"
                >
                  <div class="field has-addons mb-1">
                    <v-input
                      :placeholder="placeholder"
                      :disabled="$store.state.user.progress"
                      :hasError="hasError(errors[0])"
                      :value="username"
                      v-model="username"
                    />

                    <div class="ml-2">
                      <v-button
                        :hasLoading="$store.state.user.progress"
                        :disabled="$store.state.user.progress"
                        :hasError="hasError(errors[0])"
                      >
                        <slot name="button"></slot>
                      </v-button>
                    </div>
                  </div>

                  <v-input-error :error="errors[0]" />
                  <p class="has-text-center is-size-6 mt-3">
                    <slot name="link"></slot>
                  </p>
                </ValidationProvider>
              </form>
            </ValidationObserver>
          </div>
          <footer class="has-text-centered mt-6">
            <a
              class="is-size-6 has-text-white"
              href="https://github.com/jendrabayu"
              target="blank"
              >© 2020 by Jendra</a
            >
          </footer>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import VAlertMessage from "./VAlertMessage";
import VInput from "./VInput";
import VButton from "./VButton";
import VInputError from "./VInputError";

export default {
  components: {
    VAlertMessage,
    VInput,
    VButton,
    VInputError,
  },
  props: {
    errorMessage: {
      type: String,
    },
    successMessage: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    authFor: {
      type: String,
      default: "login",
      required: true,
    },
  },
  data() {
    return {
      message: {
        error: this.errorMessage,
        success: this.successMessage,
      },
      username: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.authFor == "login") {
        this.login();
      } else if (this.authFor == "register") {
        this.register();
      }
    },
    register() {
      this.clearMessage();
      if (this.username && this.username.length > 0) {
        this.$store
          .dispatch("user/register", this.username)
          .then(() => {
            this.$toast.success({
              title: "Registration is successfully",
              message: "You Can Login Here",
            });
            this.$router.push({
              name: "login",
              params: {
                successMessage:
                  "Registration is successfully, Please login to your account",
              },
            });
          })
          .catch((error) => {
            this.$toast.error({
              title: "Registration failed",
              message: error,
            });
            this.message.error = error;
            this.username = "";
            this.$refs.form.reset();
          });
      }
    },
    login() {
      this.clearMessage();
      if (this.username) {
        if (this.username && this.username.length > 0) {
          this.$store
            .dispatch("user/login", this.username)
            .then(() => {
              this.$toast.success({
                title: "Login is successful",
                message: "Welcome " + this.$store.state.user.name,
              });
              this.$router.push({ name: "home" });
            })
            .catch((error) => {
              this.$toast.error({
                title: "Login failed",
                message: error,
              });
              this.$router.push({ name: "home" });
              this.message.error = error;
              this.username = "";
              this.$refs.form.reset();
            });
        }
      }
    },
    clearMessage() {
      (this.message.error = ""), (this.message.success = "");
    },
  },
  computed: {
    alertMessage() {
      if (this.message.error && this.message.error.length > 0)
        return this.message.error;
      else if (this.message.success && this.message.success.length > 0)
        return this.message.success;
      else return "";
    },
    alertColor() {
      if (this.message.error && this.message.error.length > 0)
        return "is-danger";
      else if (this.message.success && this.message.success.length > 0)
        return "is-success";
      else return "";
    },
    hasError() {
      return (error) => {
        if (error) return true;
        return false;
      };
    },
  },
  beforeCreate() {
    document.body.className = "bg_auth";
  },
};
</script>

<style scoped>
main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#content {
  background-color: white;
  padding: 30px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.title {
  color: #26aaf0;
}

header {
  text-transform: uppercase;
  margin-bottom: 2rem;
  color: white;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
}
</style>