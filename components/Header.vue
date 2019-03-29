<template>
  <header :class="{ left: logoLeft }">
    <div class="limit">
      <nuxt-link to="/" class="logo">
        <img src="/images/logo-xnb.svg" alt="XNB" />
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    logoLeft() {
      return this.$route.path === "/";
    }
  }
};
</script>

<style lang="scss">
#__nuxt {
  header.left {
    .limit {
      max-width: 100%;
      .logo {
        left: 120px;
      }
    }
  }
}
</style>
