<template>
  <div></div>
</template>


<script>
export default {
  created() {
    this.$store.dispatch("user/logout");
    this.$router.push({ name: "login" });
  },
};
</script>