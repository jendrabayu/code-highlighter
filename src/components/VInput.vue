<template>
  <div class="control is-expanded">
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="value"
      :class="{ 'is-danger': hasError }"
      @input="$emit('input', $event.target.value)"
      ref="input"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "Placeholder input here..",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>