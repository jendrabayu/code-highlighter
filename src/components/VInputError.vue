<template>
  <p v-show="error" class="help is-danger">{{ error }}</p>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: null,
    },
  },
};
</script>