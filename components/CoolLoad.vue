<template>
  <span ref="coolLoad" :class="['coolLoad loading ' + type]">
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  data: function() {
    return {}
  },
  mounted: function() {
    const coolLoad = this.$refs.coolLoad
    const slot = this.$slots.default[0].elm
    coolLoad.classList.remove('loading')
    slot.classList.remove('waitLoad')
  },
}
</script>
