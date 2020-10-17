<template>
  <div>
    <v-navbar></v-navbar>
    <main>
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-full mt-6 box px-4 py-5">
            <h1 class="is-size-5">Edit Code</h1>
            <ValidationObserver v-slot="{ handleSubmit }" ref="form">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="columns mt-4">
                  <!-- input filename -->
                  <div class="column pr-1">
                    <ValidationProvider
                      name="filename"
                      rules="required|min:5|filename"
                      v-slot="{ errors }"
                    >
                      <div class="field">
                        <div class="control is-expanded">
                          <input
                            class="input"
                            type="text"
                            placeholder="Filename"
                            v-model="fileName"
                            :class="{ 'is-danger': errors[0] }"
                            :disabled="progress"
                          />
                        </div>
                        <p v-if="errors[0]" class="help is-danger">
                          {{ errors[0] }}
                        </p>
                      </div>
                    </ValidationProvider>
                  </div>
                  <!-- input filename -->

                  <!-- input highlight row -->
                  <div class="column pl-1">
                    <ValidationProvider
                      name="highlight row"
                      rules="highlightRow"
                      v-slot="{ errors }"
                    >
                      <div class="field">
                        <div class="control is-expanded">
                          <input
                            class="input"
                            type="text"
                            placeholder="Highlight Row"
                            v-model="highlight"
                            :class="{ 'is-danger': errors[0] }"
                            :disabled="progress"
                          />
                        </div>
                        <p v-if="errors[0]" class="help is-danger">
                          {{ errors[0] }}
                        </p>
                      </div>
                    </ValidationProvider>
                  </div>
                  <!-- input highlight row -->
                </div>

                <!-- input code -->
                <ValidationProvider
                  name="code"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="field">
                    <div class="control">
                      <textarea
                        class="textarea"
                        placeholder="Write or paste your code here..."
                        rows="10"
                        v-model="code"
                        :class="{ 'is-danger': errors[0] }"
                        :disabled="progress"
                      >
                      </textarea>
                    </div>
                    <p v-if="errors[0]" class="help is-danger">
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
                <!-- input code -->

                <div class="field is-grouped is-grouped-right mt-4">
                  <p class="control">
                    <a class="button is-warning" @click="handleReset">Reset</a>
                  </p>
                  <p class="control">
                    <router-link class="button is-light" :to="{ name: 'code' }"
                      >Back</router-link
                    >
                  </p>

                  <p class="control">
                    <button
                      type="submit"
                      :class="{ 'is-loading': progress }"
                      class="button is-primary"
                    >
                      Update
                    </button>
                  </p>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import VNavbar from "../components/VNavbar";
import axios from "axios";
import { BASE_API_URL } from "../constant";
axios.defaults.url = BASE_API_URL;
export default {
  components: { VNavbar },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      progress: false,
      code: "",
      highlight: "",
      fileName: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  created() {
    this.getOldCode();
  },
  mounted() {},
  methods: {
    handleReset() {
      this.getOldCode();
    },
    onSubmit() {
      this.$store
        .dispatch("code/update", {
          userId: this.$store.state.user.id,
          codeId: this.id,
          fileName: this.fileName,
          lang: this.getLang(),
          code: this.code,
          highlight: this.highlight,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log(error));
    },
    getLang() {
      const lang = this.fileName.replace(" ", "").split(".");
      return lang[lang.length - 1];
    },
    getOldCode() {
      this.$store
        .dispatch("code/getSingle", {
          userId: this.$store.state.user.id,
          codeId: this.id,
          highlighted: 0,
        })
        .then((result) => {
          this.code = result.code;
          this.fileName = result.fileName;
          this.highlight = result.highlight;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>