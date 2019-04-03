<template>
  <div class="wrapper">
    <nuxt-link
      v-for="blog in blogs"
      :key="blog.id"
      :to="`/${blog.name}`"
      :class="featured === 'true' ? 'featured' : 'box'"
    >
      <div class="text">
        <CoolLoad type="now">
          <h2>
            <span class="waitLoad">{{ blog.title.toLowerCase() }}</span>
          </h2>
        </CoolLoad>
        <div class="clear" />
        <CoolLoad type="dqs">
          <small>
            <span class="waitLoad">{{
              [
                $moment(blog.date * 1000).format("DD MMMM"),
                tags.find(el => el.id === blog.tag).name
              ].join(" - ")
            }}</span>
          </small>
        </CoolLoad>
        <div class="clear" />
        <CoolLoad type="dhs" style="margin-top: 10px;display: inline-block;">
          <span>
            <span class="waitLoad link">OKU --></span>
          </span>
        </CoolLoad>
      </div>
      <div class="image">
        <ImageResponsive
          :image-u-r-l="'/assets/' + blog.name + '/_thumb.jpg'"
          width="100%"
          height="100%"
          class="boxImage"
          alt="XNB Floppy"
        />
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import CoolLoad from "~/components/CoolLoad.vue";

export default {
  name: "Blog",
  components: {
    CoolLoad
  },
  props: {
    featured: {
      type: String,
      default: ""
    },
    blogs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tags: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 900pt;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.box,
.featured {
  min-width: 280pt;
  height: 340pt;
  overflow: visible;
  position: relative;
  margin: 75pt auto 0;
  display: block;
  float: left;
  flex: 0 0 30%;
  &:hover {
    .text {
      color: #f86e8f;
    }
    .coolLoad:not(.loading) .link {
      letter-spacing: 10px;
    }
  }
  .text {
    background: #fff;
    box-shadow: 0 3px 42px -15px rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 120pt;
    left: 0;
    z-index: 2;
    padding: 15pt 25pt;
    font-size: 16pt;
    color: #222;
    transition: 0.3s all;
    border-radius: 5pt;
    width: 80%;
    .link {
      transition: 0.5s letter-spacing;
    }
    small {
      color: gray;
      font-size: 12pt;
      font-weight: 300;
    }
  }
  .image {
    width: 100%;
    height: 160pt;
    position: absolute;
    right: 0;
    top: 0;
    & > * {
      height: 100%;
    }
  }
}

.featured {
  margin: 0;
  min-width: 600pt;
  height: 340pt;
  flex: 1 0 100%;
  .text {
    width: 42%;
    bottom: 0;
    left: 0;
    font-size: 24pt;
  }
  .image {
    width: 67%;
    height: 100%;
  }
}

@media screen and (max-width: 600px) {
  .box {
    min-width: 90%;
    height: auto;
    .text {
      position: relative;
      margin-top: 160px;
      top: 0;
    }
  }
}

@media screen and (max-width: 800px) {
  .featured {
    min-width: 100%;
    height: auto;
    .image {
      width: 100%;
      height: 0px;
      top: 0;
    }
    .text {
      top: 0;
      margin-top: 0px;
      width: 100%;
      position: relative;
    }
  }
}
</style>
