<template>
  <div class="control">
    <button
      :type="type"
      :class="['is-link', isDanger, className, isLoading]"
      :disabled="disabled"
      class="button px-5"
      @click="$emit('click', $event.target.value)"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "submit",
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    hasLoading: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isError() {
      return "is-danger";
    },
    isLoading() {
      if (this.hasLoading) {
        return "is-loading";
      }
      return "";
    },
    isDanger() {
      if (this.hasError) {
        return "is-danger";
      }
      return "";
    },
  },
};
</script>