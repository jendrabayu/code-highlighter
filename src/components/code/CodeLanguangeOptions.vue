<template>
  <ValidationProvider name="languange" rules="required" v-slot="{ errors }">
    <div class="field">
      <v-select-options
        name="Languange"
        :data="languangesList"
        :disabled="progress"
        @input="updateValue"
        :hasError="getError(errors[0])"
        :value="value"
      />
      <v-input-error :error="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
import axios from "axios";
import VSelectOptions from "../VSelectOptions";
import VInputError from "../VInputError";

export default {
  components: {
    VSelectOptions,
    VInputError,
  },
  props: {
    progress: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      languangesList: [],
    };
  },
  created() {
    this.getOptionsLanguange();
  },
  methods: {
    getError(error) {
      if (error) return true;
      return false;
    },
    getOptionsLanguange() {
      axios
        .get("/options")
        .then((response) => {
          const responseData = response.data;
          if (responseData.success && !responseData.error) {
            this.languangesList = responseData.data.languages;
            this.twoslashesList = responseData.data.twoslashes;
          }
        })
        .catch((error) => console.log(error));
    },
    updateValue(event) {
      if (event) {
        this.$emit("input", event);
      } else {
        this.$emit("input", null);
      }
    },
  },
};
</script>