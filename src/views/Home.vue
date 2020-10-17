<template>
  <div>
    <v-navbar />
    <main>
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-full mt-6 box px-4 py-5">
            <h1 class="title">
              Create and share beautiful images of your source code. Start
              typing or drop a file into the text area to get started.
            </h1>
            <ValidationObserver v-slot="{ handleSubmit }" ref="form">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="columns mt-4">
                  <!-- select language -->
                  <div class="column pr-1">
                    <code-languange-options
                      :progress="progress"
                      @input="(value) => (selectedLanguange = value)"
                      :value="selectedLanguange"
                    ></code-languange-options>
                  </div>
                  <!-- select language -->

                  <!-- select twoslash -->
                  <div
                    class="column px-1"
                    v-if="
                      selectedLanguange == 'json' ||
                      selectedLanguange == 'typescript'
                    "
                  >
                    <code-twoslash-options
                      :progress="progress"
                      @input="(value) => (selectedTwoslash = value)"
                    ></code-twoslash-options>
                  </div>
                  <!-- select twoslash -->

                  <!-- input filename -->
                  <div class="column px-1">
                    <ValidationProvider
                      name="filename"
                      rules="required|min:5|filename"
                      v-slot="{ errors }"
                    >
                      <div class="field">
                        <v-input
                          placeholder="Filename"
                          v-model="form.fileName"
                          :disabled="progress"
                          :hasError="getError(errors[0])"
                        />
                        <v-input-error :error="errors[0]" />
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
                        <v-input
                          placeholder="Highlight Row"
                          v-model="form.highlight"
                          :hasError="getError(errors[0])"
                          :disabled="progress"
                        />
                        <v-input-error :error="errors[0]" />
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
                    <v-text-area
                      placeholder="Write or paste your code here..."
                      :rows="5"
                      :disabled="progress"
                      v-model="form.code"
                      :hasError="getError(errors[0])"
                      :value="form.code"
                    ></v-text-area>
                    <v-input-error :error="errors[0]" />
                  </div>
                </ValidationProvider>
                <!-- input code -->

                <div class="field is-grouped is-grouped-right mt-4">
                  <v-button
                    type="button"
                    :disabled="progress"
                    @click="resetForm"
                    >Reset</v-button
                  >
                  <v-button :hasLoading="progress">Save</v-button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </main>
    <v-code-item-modal
      v-if="modal.isActive"
      :isActive="this.modal.isActive"
      :dataCode="myCode"
    ></v-code-item-modal>
  </div>
</template>

<script>
import { BASE_API_URL } from "../constant";
import axios from "axios";
import VNavbar from "../components/VNavbar";
import VCodeItemModal from "../components/code/VCodeItemModal";
import VInput from "../components/VInput";
import VInputError from "../components/VInputError";
import VButton from "../components/VButton";
import VTextArea from "../components/VTextArea";
import CodeTwoslashOptions from "../components/code/CodeTwoslashOptions";
import CodeLanguangeOptions from "../components/code/CodeLanguangeOptions";

axios.defaults.url = BASE_API_URL;

export default {
  components: {
    VNavbar,
    VCodeItemModal,
    CodeLanguangeOptions,
    CodeTwoslashOptions,
    VInput,
    VInputError,
    VButton,
    VTextArea,
  },
  data() {
    return {
      modal: {
        isActive: false,
        code: null,
      },
      form: {
        code: "",
        lang: "",
        fileName: "",
        highlight: "",
        twoslash: "",
      },
      myCode: [],
      progress: false,
      selectedLanguange: "",
      selectedTwoslash: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    onSubmit() {
      this.progress = true;
      this.form.lang = this.getLang();
      const data = {
        userId: this.$store.state.user.id,
        dataCode: this.form,
      };
      this.$store
        .dispatch("code/store", data)
        .then((result) => {
          this.$store
            .dispatch("code/getSingle", {
              userId: result.user,
              codeId: result.id,
              highlighted: 1,
            })
            .then((result) => {
              this.myCode = result;
              this.modal.isActive = true;
              this.progress = false;
              this.resetForm();
            })
            .catch((error) => {
              console.log(error);
              this.progress = false;
            });
          this.progress = false;
        })
        .catch((error) => {
          console.log(error);
          this.progress = false;
        });
    },
    getLang() {
      const lang = this.form.fileName.replace(" ", "").split(".");
      return lang[lang.length - 1];
    },
    getError(error) {
      if (error) return true;
      return false;
    },
    resetForm() {
      this.form.code = "";
      this.form.lang = "";
      this.form.fileName = "";
      this.form.highlight = "";
      this.form.twoslash = "";
      this.selectedLanguange = "";
      this.selectedTwoslash = "";
      this.$refs.form.reset();
    },
  },
  beforeCreate() {
    document.body.className = "";
  },
};
</script>


<style scoped>
.title {
  font-size: 1.8rem;
  color: #273a6e;
}
</style>