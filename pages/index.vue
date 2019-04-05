<template>
  <div id="root">
    <Header />
    <main>
      <div class="background">
        <div class="dots" :style="dots" />
      </div>
      <BlogCard :blogs="[blogs[0]]" :tags="tags" featured="true" />
      <BlogCard :blogs="blogs.slice(1, 7)" :tags="tags" />
      <nuxt-link to="/yazilar" class="toAll">
        Tüm Yazılar
      </nuxt-link>
    </main>
  </div>
</template>

<script>
import blogs from "~/contents/blogs.js";
import tags from "~/contents/tags.js";

import Header from "~/components/Header.vue";
import BlogCard from "~/components/Blog.vue";

export default {
  meta: {
    depth: 1
  },
  components: {
    Header,
    BlogCard
  },

  data: function() {
    return {
      dots: ""
    };
  },

  computed: {
    ogImage: function() {
      return `${process.env.baseUrl}/images/og-banner.png`;
    }
  },
  async asyncData({ store }) {
    async function asyncImport(blogName) {
      const wholeMD = await import(`~/contents/blog/${blogName}.md`);
      return wholeMD.attributes;
    }
    const allBlogs = await Promise.all(
      blogs.map(blog => asyncImport(blog))
    ).then(blogs => {
      return { blogs };
    });
    return { ...allBlogs, tags };
  },

  created() {
    let k = "";
    for (let i = -60; i < 60; i++) {
      for (let j = -10; j < 10; j++) {
        k += i * 30 + "px " + j * 30 + "px #fff,";
      }
    }
    this.dots = { boxShadow: k.slice(0, -1) };
  },

  mounted() {
    const that = this;
    setInterval(function() {
      let k = "";
      for (let i = -60; i < 60; i++) {
        for (let j = -10; j < 10; j++) {
          const mr = Math.random();
          if (mr > 0.99) {
            k += i * 30 + "px " + j * 30 + "px 0px 1px #f86e8f,";
          } else if (mr > 0.6) {
            k += i * 30 + "px " + j * 30 + "px #eee,";
          } else {
            k += i * 30 + "px " + j * 30 + "px #fff,";
          }
        }
      }
      that.dots = { boxShadow: k.slice(0, -1) };
    }, 1000);
  },

  head() {
    return {
      title: "XNB",
      htmlAttrs: {
        lang: "tr"
      },
      meta: [
        { name: "author", content: "Ata Gülalan" },
        {
          name: "description",
          property: "og:description",
          content:
            "Mütevazı bir dille gerçeklerin konuşulduğu, kâr amacı gütmeyen, reklamsız ve emojisiz bir bloğa rastladınız. Konusu olmayan bu blogda her telden yazılar yazılır, resimler çizilir.",
          hid: "description"
        },
        { property: "og:title", content: "XNB" },
        { property: "og:image", content: this.ogImage },
        {
          name: "twitter:description",
          content:
            "Mütevazı bir dille gerçeklerin konuşulduğu, kâr amacı gütmeyen, reklamsız ve emojisiz bir bloğa rastladınız. Konusu olmayan bu blogda her telden yazılar yazılır, resimler çizilir."
        },
        { name: "twitter:image", content: this.ogImage }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@supports (-webkit-appearance: none) {
  @media screen and (max-width: 800px) {
    #root {
      height: calc(100vh - 56px);
    }
  }
}

main {
  padding-top: 160pt;
  padding-bottom: 160pt;
  background: #eee;
  overflow: hidden;
}

.toAll {
  font-size: 24pt;
  color: #f86e8f;
  text-decoration: none;
  margin: 75pt auto 0;
  display: inline-block;
  width: 100%;
  text-align: center;
  &::after {
    display: inline-block;
    transition: 0.3s transform;
    content: "-->";
  }
  &:hover::after {
    transform: translateX(3px);
  }
}

.background {
  width: 100%;
  top: 0;
  height: 400pt;
  background: #fff;
  position: absolute;
  overflow: hidden;
  left: 0;
  z-index: 0;
  &:before {
    content: "";
    width: 100%;
    height: 250%;
    z-index: 3;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.5) 30%,
      rgba(255, 255, 255, 0) 100%
    );
    position: absolute;
  }
  .dots {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: block;
    position: absolute;
    left: 50vw;
    top: 200pt;
    transition: 1s box-shadow linear;
  }
}

@media screen and (max-width: 800px) {
  main {
    padding-top: 144px;
    padding-bottom: 144px;
    background: white;
  }
}
</style>

<style>
.boxImage img {
  object-fit: cover !important;
  background-position: 50% 50%;
  height: 100%;
  border-radius: 5pt;
}
</style>
