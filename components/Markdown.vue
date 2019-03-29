<script lang="js">
  import MdLink from './MdLink.vue'
  import AudioPlayer from './AudioPlayer.vue'

  export default {
    props: ["renderFunc", "staticRenderFuncs"],
    components: {
      AudioPlayer, MdLink 
    },
    render: function (createElement) {
      return this.templateRender ? this.templateRender() : createElement("div", "Rendering");
    },

    created: function () {
      this.templateRender = new Function(this.renderFunc)();
      this.$options.staticRenderFns = new Function(this.staticRenderFuncs)();
    }
  }
</script>