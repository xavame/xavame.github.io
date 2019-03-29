<script>
import MdLink from "./MdLink.vue";
import ContentPlayer from "./ContentPlayer.vue";
import FiguredImage from "./FiguredImage.vue";

export default {
  components: {
    MdLink,
    ContentPlayer,
    FiguredImage
  },
  props: {
    renderFunc: {
      type: String,
      default: ""
    },
    staticRenderFuncs: {
      type: String,
      default: ""
    }
  },
  created: function() {
    // DUDE. I CANNOT CONVERT STRING TO FUNCTION
    // WITHOUT USING DISGUSTING MIGHTY EVIL "EVAL".
    // CODE BELOW IS "EVAL" ITSELF, BUT IN DISGUISE.
    // I AM REALLY SORRY. I KNOW YOU CAN DO BETTER.
    /* eslint-disable no-new-func */
    this.templateRender = new Function(this.renderFunc)();
    this.$options.staticRenderFns = new Function(this.staticRenderFuncs)();
  },
  render: function(createElement) {
    return this.templateRender
      ? this.templateRender()
      : createElement("div", "Rendering");
  }
};
</script>
