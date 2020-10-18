<template>
  <div class="modal" :class="{ 'is-active': active }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <v-code-item :dataCode="code"></v-code-item>
      </section>
      <footer class="modal-card-foot">
        <router-link class="button is-success" :to="{ name: 'code' }"
          >See All Codes</router-link
        >
        <button class="button" @click="handleClose">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import VCodeItem from "./VCodeItem";
export default {
  components: { VCodeItem },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    dataCode: {
      type: [Object, Array],
      required: true,
    },
  },

  data() {
    return {
      active: this.isActive,
      code: this.dataCode,
    };
  },
  methods: {
    handleClose() {
      (this.active = false), (this.code = []);
      this.$emit("close");
    },
  },
};
</script>