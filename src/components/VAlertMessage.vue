<template>
  <div class="notification is-light py-2 mb-3" :class="color">
    <button @click="$emit('close')" class="delete"></button>
    <small>{{ message }}</small>
  </div>
</template>

<script>
export default {
  name: "alert-message",
  props: {
    color: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
};
</script>