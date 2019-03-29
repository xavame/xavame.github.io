<template lang="html">
  <div v-lazy-container="{ selector: 'img' }" class="placeholder">
    <img
      :data-src="imageURL"
      :width="width"
      :height="height"
      :class="classes"
      :alt="alt"
    />
  </div>
</template>

<script>
export default {
  props: {
    imageURL: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: ""
    },
    classes: {
      type: String,
      default: ""
    }
  },
  computed: {
    imageRequired() {
      return this.imageURL;
    }
  }
};
</script>

<style scoped lang="scss">
.placeholder {
  overflow: hidden;
  line-height: 0;
}

@keyframes splash {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

img {
  transition: all 0.3s;
  opacity: 0;

  &[lazy="loading"] {
    opacity: 1;
  }
  &[lazy="loaded"] {
    opacity: 1;
    animation: splash 0.3s normal forwards ease-in-out;
  }
}
</style>
