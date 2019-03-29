<template>
  <nuxt-link :to="this.href" :target="this.target" :class="'internal'" v-if="this.target==='_self'">
    <slot></slot>
  </nuxt-link>
  <a :href="this.href" :target="this.target" :class="'external'" v-else>
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String
    }
  },
  computed: {
    target () {
      return this.href ? this.href.startsWith("/") ? "_self" : "_blank" : "_blank"
    }
  },
}
</script>