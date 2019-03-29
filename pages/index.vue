<template>
  <div id="root">
    <Header />
    <main class="homepage">
      <div class="left">
        <nuxt-link :to="`/${featured.name}`" class="item">
          <CoolLoad type="now">
            <h2>
              <span class="waitLoad">{{ featured.title.toLowerCase() }}</span>
            </h2>
          </CoolLoad>
          <CoolLoad type="dqs" style="margin-top: 30px;display: inline-block;">
            <span>
              <span class="waitLoad link">OKU --></span>
            </span>
          </CoolLoad>
        </nuxt-link>
      </div>
      <div class="right slider" style="background: rgb(248, 110, 143);">
        <ImageResponsive
          image-u-r-l="/images/slide1.png"
          width="100%"
          class="sliderImage"
          alt="XNB Floppy"
        />
      </div>
      <footer class="fadeIn">
        <div class="limit">
          <nuxt-link to="/yazilar" class="left">
            <div class="fadeFromBottom">
              TÜM YAZILARA GİT
            </div>
            <span class="floatRight fadeFromBottom">--&gt;</span>
          </nuxt-link>
          <div class="right">
            <div class="counter">
              <div class="dots">
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
import blogs from "~/contents/blogs.js";
import Header from "~/components/Header.vue";
import CoolLoad from "~/components/CoolLoad.vue";

export default {
  meta: {
    depth: 1
  },
  components: {
    Header,
    CoolLoad
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
    const featured = await asyncImport(blogs[0]);
    return { featured };
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
      overflow: hidden;
      height: calc(100vh - 56px);
    }
  }
}

header .limit {
  max-width: 100%;
  .logo {
    left: 120px;
  }
  .menu {
    display: none;
  }
  .search {
    background-image: url("/assets/img/png/search_white.png");
  }
}

main {
  display: block;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  & > .left {
    float: left;
    max-width: 1040px;
    width: calc(100vw - 800px);
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .item {
      display: inline;
      position: relative;
      padding: 0 120px;
      text-decoration: none;
      color: black;
      cursor: pointer;
      .coolLoad {
        transition: 0.4s color;
      }
      &:hover {
        .coolLoad:not(.loading) {
          color: #f86e8f;
        }
      }
      h2 {
        line-height: 1em;
        font-weight: 400;
        font-size: 54pt;
      }
      .link {
        clear: both;
        display: inline-block;
        font-size: 18pt;
        transition: 0.5s letter-spacing;
      }
      &:hover .coolLoad:not(.loading) .link {
        letter-spacing: 10px;
      }
    }
  }
  & > .slider {
    width: 800px;
    height: 100%;
    display: flex;
    align-items: center;
    float: right;
    transition: 0.5s background;
    .sliderImage {
      width: 100%;
      transition: 0.5s opacity, 0.5s transform;
      transform: translateY(0px);
      &.unload {
        transform: translateY(50px);
        opacity: 0;
      }
      &.finish {
        transform: translateY(-50px);
        opacity: 0;
      }
    }
  }
}
footer {
  overflow: hidden;
  width: 100%;
  height: 144px;
  background-color: transparent;
  bottom: 0;
  left: 0;
  position: absolute;
  .limit {
    display: flex;
    align-items: center;
    height: 100%;
    max-width: 100%;
    padding: 0;
    .left {
      text-decoration: none;
      color: #282828;
      display: flex;
      align-items: center;
      padding: 0 120px;
      height: 100%;
      width: calc(100vw - 800px);
      background: rgba(0, 0, 0, 0.1);
      font-size: 18pt;
      transition: 0.4s color;
      &:hover {
        color: #f86e8f;
      }
      .floatRight {
        margin-left: auto;
      }
    }
    .right {
      height: 100%;
      width: 800px;
      background: #282828;
      display: flex;
      align-items: center;
      .counter {
        width: 100%;
        margin: 0 120px;
        position: relative;
        .line {
          position: absolute;
          height: 3px;
          border-radius: 6px;
          width: 0%;
          background: white;
          left: 0px;
          z-index: 1;
          transition: 0.1s width linear, 0.5s opacity;
          &.done {
            opacity: 0;
          }
          &.reset {
            width: 0% !important;
          }
        }
        .dots {
          position: relative;
          z-index: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .dot {
            width: 3px;
            height: 3px;
            background: #f86e8f;
            border-radius: 6px;
            &.bubble {
              animation: ripple 0.5s ease-in-out 0s 1 normal forwards;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  main {
    .left {
      width: 800px;
    }
    .right {
      width: calc(100vw - 800px);
    }
  }
  footer {
    .limit {
      .left {
        width: 800px;
      }
      .right {
        width: calc(100vw - 800px);
      }
    }
  }
}

@media screen and (max-width: 1360px) {
  header .limit .search {
    background-image: url("/assets/img/png/search_black.png");
  }
  main {
    .left {
      width: 100%;
    }
    .right {
      width: 0%;
    }
  }
  footer {
    .limit {
      .left {
        width: 100%;
      }
      .right {
        width: 0%;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  header .limit {
    text-align: center;
    max-width: 100%;
    padding: 0 24px;
    .logo {
      left: calc(50% - 50px);
    }
    .search {
      display: none;
    }
  }
  main {
    .left {
      width: 100%;
      text-align: center;
      .item {
        padding: 0 24px;
        h2 {
          font-size: 32pt;
          margin: 0 auto;
        }
        span {
          margin: 0 auto;
        }
      }
    }
    .right {
      width: 0%;
    }
  }
  footer {
    height: 80px;
    .limit {
      .left {
        padding: 0 24px;
        text-align: center;
        width: 100%;
        font-size: 14pt;
        div {
          width: 100%;
          display: inline-block;
        }
        .floatRight {
          display: none;
        }
      }
      .right {
        width: 0%;
      }
    }
  }
}
</style>
