<template>
  <div class="control">
    <div
      class="select is-fullwidth"
      :class="{ 'is-danger': hasError, 'is-loading': hasLoading }"
    >
      <select
        :id="name"
        @change="$emit('input', $event.target.value)"
        :disabled="disabled"
      >
        <option disabled selected>Select {{ name }}</option>
        <option
          v-for="(data, index) in data"
          :key="index"
          :value="data"
          :selected="isSelected(data)"
        >
          {{ data }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: [Array, Object],
      required: true,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    hasLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: "",
    },
  },
  computed: {
    isSelected() {
      return (selected) => {
        return this.value === selected;
      };
    },
  },
};
</script>