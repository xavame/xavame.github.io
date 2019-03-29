<template>
  <div class="embedYoutube">
    <iframe
      height="450"
      :src="'https://www.youtube.com/embed/' + id"
      frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  }
};
</script>
