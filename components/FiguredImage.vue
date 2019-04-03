<template>
  <figure v-if="title" :class="title">
    <ImageResponsive
      :class="title"
      :image-u-r-l="src"
      :alt="alt"
      :title="alt"
    />
    <figcaption v-if="alt">
      {{ alt }}
    </figcaption>
  </figure>
  <ImageResponsive
    v-else
    :class="title"
    :image-u-r-l="src"
    :alt="alt"
    :title="alt"
  />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    }
  },
  computed: {
    target() {
      return this.href
        ? this.href.startsWith("/")
          ? "_self"
          : "_blank"
        : "_blank";
    }
  }
};
</script>
