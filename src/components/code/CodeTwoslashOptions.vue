<template>
  <ValidationProvider name="twoslash" rules="required" v-slot="{ errors }">
    <div class="field">
      <v-select-options
        :data="twoslashes"
        name="Twhoslash"
        :disabled="progress"
        @input="updateValue"
        v-model="selectedValue"
      />
      <v-input-error :error="errors[0]"></v-input-error>
    </div>
  </ValidationProvider>
</template>

<script>
import VSelectOptions from "../VSelectOptions";
import VInputError from "../VInputError";

export default {
  components: {
    VInputError,
    VSelectOptions,
  },
  props: {
    progress: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      twoslashes: ["twoslash", "tsconfig"],
      selectedValue: "",
    };
  },
  methods: {
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