<template>
  <div id="layout">
    <transition :name="routeTransitionDirection">
      <nuxt :key="$route.fullPath" />
    </transition>
  </div>
</template>

<script>
    export default {
      computed: {
        routeTransitionDirection () {
          return this.$store.state.routeTransitionDirection
        }
      },
    };
</script>

<style>
  @keyframes getInLeft {
    0% {
      height:auto;
      opacity:0;
      transform: translateX(-50px);
    }
    100% {
      height:auto;
      opacity:1;
      transform: translateX(0px);
    }
  }

  @keyframes getOutLeft {
    0% {
      opacity:1;
      transform: translateX(0px);
    }
    100% {
      opacity:0;
      transform: translateX(50px);
    }
  }

  @keyframes getInRight {
    0% {
      height:auto;
      opacity:0;
      transform: translateX(50px);
    }
    100% {
      height:auto;
      opacity:1;
      transform: translateX(0px);
    }
  }

  @keyframes getOutRight {
    0% {
      opacity:1;
      transform: translateX(0px);
    }
    100% {
      opacity:0;
      transform: translateX(-50px);
    }
  }

  .left-enter-active, .right-enter-active{
    height:0;
    overflow:hidden;
    animation: getInLeft 0.2s ease-out .2s;
  }

  .right-enter-active{
    animation: getInRight 0.2s ease-out .2s;
  }

  .left-leave-active{
    animation: getOutLeft 0.2s ease-in 0s;
  }

  .right-leave-active{
    animation: getOutRight 0.2s ease-in 0s;
  }
</style>