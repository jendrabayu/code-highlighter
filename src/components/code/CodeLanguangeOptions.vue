<template>
  <ValidationProvider name="languange" rules="required" v-slot="{ errors }">
    <div class="field">
      <v-select-options
        name="Languange"
        :data="$store.state.code.languages"
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
  created() {
    this.$store.dispatch("code/getLanguages");
  },
  methods: {
    getError(error) {
      if (error) return true;
      return false;
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