<template>
  <div class="control">
    <textarea
      class="textarea"
      :placeholder="placeholder"
      :rows="rows"
      :class="{ 'is-danger': hasError }"
      :disabled="disabled"
      :value="value"
      @input="$emit('input', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Placeholder text area here...",
    },
    rows: {
      type: Number,
      default: 5,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
  },
};
</script>