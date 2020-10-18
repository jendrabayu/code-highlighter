<template>
  <button
    class="button"
    :class="[color, size, loading]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span>{{ title }}</span>
    <span class="icon"><i :class="[icon, size]"></i></span>
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Number],
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "submit",
    },
    progress: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "is-link",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    loading() {
      if (this.progress) return "is-loading";
      return "";
    },
  },
};
</script>