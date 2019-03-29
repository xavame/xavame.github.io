<template>
  <nuxt-link
    v-if="target === '_self'"
    :to="href"
    :target="target"
    :class="'internal'"
  >
    <slot />
  </nuxt-link>
  <a v-else :href="href" :target="target" :class="'external'">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
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
