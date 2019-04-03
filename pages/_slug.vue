<template>
  <div id="root">
    <Header />
    <main class="totem">
      <div class="intro">
        <!--<span class="yil">{{ year }}</span> —-->
        <h1>{{ title }}</h1>
      </div>
      <div class="container small">
        <Markdown
          :render-func="renderFunc"
          :static-render-funcs="staticRenderFuncs"
        />
      </div>
    </main>
  </div>
</template>

<script lang="js">

import Markdown from "~/components/Markdown.vue"
import Header from '~/components/Header.vue'

export default {
  meta: {
    depth: 3
  },
  components: { Markdown, Header },
  computed: {
    ogImage: function () {
      return `/assets/${this.name}/_thumb.jpg`;
      // return `${process.env.baseUrl}/images/blog/${this.id}/_thumbnail.jpg`;
    },
    pageTitle: function () {
      return this.title + ' – XNB';
    },
  },
    async asyncData ({params, store}) {
      const fileContent = await import(`~/contents/blog/${params.slug}.md`)
      const attr = fileContent.attributes
      return {
        name: params.slug,
        title: attr.title,
        date: attr.date,
        owner: attr.owner,
        tag: attr.tag,
        role: attr.role,
        description: attr.description,
        related: attr.related,
        renderFunc: fileContent.vue.render,
        staticRenderFuncs: fileContent.vue.staticRenderFns,
        image: {
          main: attr.image && attr.image.main,
          og: attr.image && attr.image.og
        }
      }
    },

  head () {
    return {
      title: this.pageTitle,
      htmlAttrs: {
        lang: "tr",
      },
      meta: [
        { name: "author", content: "Ata Gülalan" },
        { name: "description", property: "og:description", content: this.description, hid: "description" },
        { property: "og:title", content: this.pageTitle },
        { property: "og:image", content: this.ogImage },
        { name: "twitter:description", content: this.description },
        { name: "twitter:image", content: this.ogImage }
      ],
      link: ['']
    };
  },

  mounted: function() {
    // wait for animation before scrolling to top
    setTimeout(function(){
      this.scrollToTop(document.getElementById("__nuxt"), 100, 3);
    }.bind(this),200)
  },

  methods: {
    scrollToTop: (element, totalTime, easingPower) => {
      const easeInOut = (t, power) => {
        if (t < 0.5) {
          return 0.5 * Math.pow(2 * t, power);
        } else {
          return 0.5 * (2 - Math.pow(2 * (1 - t), power));
        }
      };
      const timeInterval = 1;
      const scrollTop = Math.round(element.scrollTop);
      let timeLeft = totalTime;
      const scrollByPixel = setInterval(function() {
        const percentSpent = (totalTime - timeLeft) / totalTime;
        if (timeLeft >= 0) {
          const newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower));
          element.scrollTop = newScrollTop;
          timeLeft--;
        } else {
          clearInterval(scrollByPixel);
        }
      }, timeInterval);
    },
  },

}
</script>

<style scoped lang="scss">
@media screen and (max-width: 800px) {
  main.totem {
    white-space: pre-line;
    word-break: break-word;
    h1 {
      font-size: 32pt;
    }
    h2,
    h3,
    h4,
    h5,
    h6 {
      padding: 50pt 10pt 10pt;
    }
    p,
    .p {
      padding: 0 10pt 30pt;
    }
    pre {
      code {
        border-radius: 0;
      }
    }
    blockquote {
      margin: 0pt auto;
    }
    table {
      border-radius: 0;
    }
    ul,
    ol {
      margin: 0 10pt;
    }
  }
}
</style>
