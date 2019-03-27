<template>
  <div id="root" key="sed">
    <Header/>
    <main class="totem">
      <h1>Yazılar</h1>
      <p>Efendim burada, geçenlerde yazdığım yazıları bulacaksınız. En üsttekiler, en son yazılanlardır. Kategoriler yazıların solunda belirtilmiştir.</p>
      <div class="yazilar">
        <p>
          <nuxt-link 
        <nuxt-link 
          <nuxt-link 
            v-for="blog in blogs"
            :key="blog.name"
            :to="'/'+blog.name"
            class="internal"
          >
            {{ blog.title }}
          </nuxt-link>
        </p>
        <h2 id="dersler">Dersler</h2>
        <p>
          <nuxt-link 
        <nuxt-link 
          <nuxt-link 
            v-for="blog in lectures"
            :key="blog.name"
            :to="'/'+blog.name"
            class="internal"
          >
            {{ blog.title }}
          </nuxt-link>
        </p>
      </div>
    </main>
  </div>
</template>

<script>
  import blogs from '~/contents/blogs.js'
  import lectures from '~/contents/lectures.js'
  import Header from '~/components/Header.vue'

  export default {
    meta: {
      depth: 2
    },
    components: { Header },
    async asyncData ({store}) {

      async function asyncImport (blogName) {
        const wholeMD = await import(`~/contents/blog/${blogName}.md`)
        return wholeMD.attributes
      }
      var allBlogs = await Promise.all(blogs.map(blog => asyncImport(blog))).then(el=>{
         return {blogs:el}
      })
      var allLectures = await Promise.all(lectures.map(lecture => asyncImport(lecture))).then(el=>{
         return {lectures:el}
      })

      return {...allBlogs,...allLectures};

    },

    head () {
      return {
        title: "Yazılar - XNB",
        htmlAttrs: {
          lang: "tr",
        },
        meta: [
          { name: "author", content: "Ata Gülalan" },
          { name: "description", property: "og:description", content: this.desc, hid: "description" },
          { property: "og:title", content: this.title},
          { property: "og:image", content: this.image },
          { name: "twitter:description", content: this.desc },
          { name: "twitter:image", content: this.image }
        ]
      }
    },

    computed: {
      url: function () {
        return process.env.baseUrl;
      },
      image: function () {
        return `${process.env.baseUrl}/images/og-banner.png`;
      },
      title: function () {
        return "Ceci n'est pas un blog" ;
      },
      desc: function () {
        return "Delirmeye ramak kalmışken.";
      }
    },
    methods: {
      beforeEnter: function (el) {
        // ...
        console.log("be")
      },
      // the done callback is optional when
      // used in combination with CSS
      enter: function (el, done) {
        // ...
        console.log("e")
        done()
      },
      afterEnter: function (el) {
        console.log("ae")
        // ...
      },
      enterCancelled: function (el) {
        console.log("ec")
        // ...
      },
    }
  }
</script>

<style scoped lang="scss">
  main.totem a{
    width:100%;
    &[target="_self"]::after, &.internal::after {
      content: '-->';
    }
  }
</style>