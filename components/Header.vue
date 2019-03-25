<template>
  <header :class="{ 'left': darkHeaderRoutes }">
    <div class="limit">
      <nuxt-link to="/" class="logo">
        <img src="/images/logo-xnb.svg" alt="XNB">
      </nuxt-link>
    </div>
  </header>
</template>

<script>

export default {
  name: "Header",
  computed: {
    altRoutes () {
      return this.$route.path === '/' || this.$route.path === '/blog'
    },
    darkHeaderRoutes () {
      return this.$route.path === '/'
    }
  }
};
</script>


<style lang="scss">
#__nuxt {
  header.left{
    .limit {
      max-width: 100%;
      .logo {
        left: 120px;
      }
    }
  }
}
</style>
