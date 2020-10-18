<template>
  <div>
    <v-navbar />
    <main class="px-5">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-full mt-6 box px-4 py-5">
            <h1 class="title is-size-3-tablet is-size-4-mobile mb-6">
              Create and share beautiful images of your source code. Start
              typing or drop a file into the text area to get started.
            </h1>
            <v-alert-message
              v-show="message.error || message.success"
              :color="alertColor"
              :message="alertMessage"
              @close="clearMessage"
            ></v-alert-message>
            <ValidationObserver v-slot="{ handleSubmit }" ref="form">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="columns">
                  <!-- select language -->
                  <div class="column">
                    <code-languange-options
                      :progress="progress"
                      @input="(value) => (languange = value)"
                      :value="languange"
                    />
                  </div>
                  <!-- select language -->

                  <!-- select twoslash -->
                  <div
                    class="column"
                    v-if="languange == 'json' || languange == 'typescript'"
                  >
                    <code-twoslash-options
                      :progress="progress"
                      @input="(value) => (form.twoslash = value)"
                    ></code-twoslash-options>
                  </div>
                  <!-- select twoslash -->

                  <!-- input filename -->
                  <div class="column">
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
                  <div class="column">
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
                    className="is-link is-outlined"
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
    <code-item-modal
      @close="closeModal"
      v-if="modal.show"
      :isActive="modal.show"
      :dataCode="modal.code"
    ></code-item-modal>
  </div>
</template>

<script>
import VNavbar from "../components/VNavbar";
import CodeItemModal from "../components/code/CodeItemModal";
import VInput from "../components/VInput";
import VAlertMessage from "../components/VAlertMessage";
import VInputError from "../components/VInputError";
import VButton from "../components/VButton";
import VTextArea from "../components/VTextArea";
import CodeTwoslashOptions from "../components/code/CodeTwoslashOptions";
import CodeLanguangeOptions from "../components/code/CodeLanguangeOptions";

import { parseLang } from "../utils/index";

export default {
  components: {
    VNavbar,
    CodeItemModal,
    CodeLanguangeOptions,
    CodeTwoslashOptions,
    VInput,
    VInputError,
    VButton,
    VTextArea,
    VAlertMessage,
  },
  data() {
    return {
      progress: false,
      modal: {
        show: false,
        code: [],
      },
      form: {
        code: "",
        lang: "",
        fileName: "",
        highlight: "",
        twoslash: "",
      },
      message: {
        success: "",
        error: "",
      },
      languange: "",
    };
  },
  beforeCreate() {
    document.body.className = "";
  },
  methods: {
    onSubmit() {
      this.storeCode();
    },
    closeModal() {
      this.resetForm();
      this.modal.code = [];
      this.modal.show = false;
    },
    resetForm() {
      this.form.code = "";
      this.form.lang = "";
      this.form.fileName = "";
      this.form.highlight = "";
      this.form.twoslash = "";
      this.languange = "";
      this.form.twoslash = "";
      this.$refs.form.reset();
    },
    storeCode() {
      this.progress = true;
      this.form.lang = parseLang(this.form.fileName);
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
              this.modal.code = result;
              this.modal.show = true;
              this.progress = false;
              this.resetForm();
            })
            .catch((error) => {
              this.progress = false;
              this.message.error = error;
            });
          this.progress = false;
        })
        .catch((error) => {
          this.progress = false;
          this.message.error = error;
        });
    },
    clearMessage() {
      (this.message.error = ""), (this.message.success = "");
    },
  },
  computed: {
    getError() {
      return (error) => {
        if (error) return true;
        return false;
      };
    },
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
  },
};
</script>

<style scoped>
.title {
  color: #273a6e;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>