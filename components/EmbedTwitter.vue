<template>
  <div class="embedTwitter">
    <blockquote class="twitter-tweet" tw-align-center data-lang="en">
      <p lang="en" dir="ltr">
        <a :href="id" />
      </p>
    </blockquote>
    <script
      async
      src="https://platform.twitter.com/widgets.js"
      charset="utf-8"
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
