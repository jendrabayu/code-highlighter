<template>
  <main>
    <header>code highligter</header>
    <div id="content">
      <h1 v-if="authFor == 'login'" class="title"><span>Log</span> in</h1>
      <h1 v-else-if="authFor == 'register'" class="title">
        <span>Sign</span> up
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
    <footer>
      <a href="https://github.com/jendrabayu" target="blank"
        >© 2020 by Jendra</a
      >
    </footer>
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
            this.$router.push({
              name: "login",
              params: {
                successMessage:
                  "Registration is successful, Please login to your account",
              },
            });
          })
          .catch((error) => {
            console.log(error);
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
              this.$router.push({ name: "home" });
            })
            .catch((error) => {
              console.log(error);
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
.button .is-primary {
  background-color: #27aaf0 !important;
}
main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#content {
  width: 50%;
  background-color: white;
  padding: 30px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.title {
  color: #26aaf0;
  font-size: 2rem;
}

.title span {
  font-weight: bold;
}

header {
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-size: 3rem;
  color: white;
  font-weight: 200;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
}

footer {
  margin-top: 2rem;
}

footer a {
  color: white;
  font-size: 0.8rem;
}

@media (max-width: 1024px) {
  #content {
    width: 60%;
  }
}
@media (max-width: 768px) {
  #content {
    width: 70%;
  }
}
@media (max-width: 650px) {
  #content {
    width: 90%;
  }
}
@media (max-width: 425px) {
}
</style>