<template>
  <div id="root" key="sed">
    <Header />
    <main class="totem">
      <h1>Yazılar</h1>
      <p>
        Efendim burada, geçenlerde yazdığım yazıları bulacaksınız. En
        üsttekiler, en son yazılanlardır. Kategoriler yazıların solunda
        belirtilmiştir.
      </p>
      <div class="yazilar">
        <div class="p">
          <div class="tags">
            <div
              v-for="tag in tags"
              :key="tag.name"
              :class="['tag', activeTag === tag.id ? 'active' : ''].join(' ')"
              @click="tagChange(tag.id)"
            >
              <span>{{ tag.name }}</span>
              <div class="circle" :style="'background: ' + tag.color + ';'" />
            </div>
          </div>
        </div>
        <div v-for="year in dates" :key="year.id">
          <div v-for="month in year.months" :key="month.name">
            <h2
              v-if="
                activeTag === 'all' ||
                  month.blogs.find(el => el.tag === activeTag)
              "
            >
              {{ activeTag === "all" ? month.yearName : year.id }}
              <div class="right">
                {{ month.name }}
              </div>
            </h2>
            <p
              v-if="
                activeTag === 'all' ||
                  month.blogs.find(el => el.tag === activeTag)
              "
            >
              <span v-for="blog in month.blogs" :key="blog.name">
                <nuxt-link
                  v-if="activeTag === 'all' || activeTag === blog.tag"
                  :to="'/' + blog.name"
                  class="internal"
                >
                  <div
                    class="circle"
                    :style="
                      'background:' +
                        (tags.find(tag => tag.id === blog.tag)
                          ? tags.find(tag => tag.id === blog.tag).color
                          : '#333')
                    "
                  />
                  <span>{{ blog.title }}</span>
                  <div class="arrow">
                    <div class="date">
                      {{ blog.dmy[0] }}
                    </div>
                  </div>
                </nuxt-link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import blogs from "~/contents/blogs.js";
import lectures from "~/contents/lectures.js";
import Header from "~/components/Header.vue";

export default {
  meta: {
    depth: 2
  },
  components: { Header },
  data: function() {
    return {
      tags: [
        { id: "all", name: "Tümü", color: "#ccc" },
        { id: "rant", name: "Eleştiri", color: "#e06c75" },
        { id: "code", name: "Yazılım", color: "#98c379" },
        { id: "design", name: "Tasarım", color: "#448aff" },
        { id: "lecture", name: "Ders", color: "#7929d0" },
        { id: "other", name: "Diğer", color: "#e6c07b" }
      ],
      activeTag: "all"
    };
  },
  computed: {
    url: function() {
      return process.env.baseUrl;
    },
    image: function() {
      return `${process.env.baseUrl}/images/og-banner.png`;
    },
    title: function() {
      return "Ceci n'est pas un blog";
    },
    desc: function() {
      return "Delirmeye ramak kalmışken.";
    }
  },
  async asyncData({ $moment }) {
    $moment.locale("tr");
    const m = $moment;
    async function asyncImport(blogName) {
      const wholeMD = await import(`~/contents/blog/${blogName}.md`);
      return wholeMD.attributes;
    }
    const allBlogs = await Promise.all(
      blogs.map(blog => asyncImport(blog))
    ).then(blogs => {
      return { blogs };
    });
    const allLectures = await Promise.all(
      lectures.map(lecture => asyncImport(lecture))
    ).then(lectures => {
      return { lectures };
    });

    const merged = [...allBlogs.blogs, ...allLectures.lectures];
    const dates = [];

    merged.sort((a, b) => b.date - a.date);
    merged.map(el => {
      const dateArray = [
        m(el.date * 1000).format("DD"),
        m(el.date * 1000).format("MM"),
        m(el.date * 1000).format("YYYY")
      ];

      let yearJustCreated = false;

      // IF YEAR IS UNDEFINED
      if (!dates.find(el => el.id === dateArray[2])) {
        dates.push({
          id: dateArray[2],
          months: {}
        });
        yearJustCreated = true;
      }

      // IF MONTH IS UNDEFINED
      if (!dates.find(el => el.id === dateArray[2]).months[dateArray[1]]) {
        dates.find(el => el.id === dateArray[2]).months[dateArray[1]] = {
          yearName: yearJustCreated ? dateArray[2] : "",
          name: m.months(dateArray[1] - 1),
          blogs: []
        };
      }

      el.dmy = dateArray;

      dates
        .find(el => el.id === dateArray[2])
        .months[dateArray[1]].blogs.push(el);
    });

    return { dates };
  },

  head() {
    return {
      title: "Yazılar - XNB",
      htmlAttrs: {
        lang: "tr"
      },
      meta: [
        { name: "author", content: "Ata Gülalan" },
        {
          name: "description",
          property: "og:description",
          content: this.desc,
          hid: "description"
        },
        { property: "og:title", content: this.title },
        { property: "og:image", content: this.image },
        { name: "twitter:description", content: this.desc },
        { name: "twitter:image", content: this.image }
      ]
    };
  },
  methods: {
    tagChange: function(el) {
      this.activeTag = el;
    }
  }
};
</script>

<style scoped lang="scss">
main.totem {
  padding-bottom: 500px;
  h2 {
    overflow: hidden;
    clear: both;
    float: none;
  }
  .tags {
    width: auto;
    display: inline-block;
    &:hover {
      .tag {
        &.active {
          opacity: 0.3;
          span {
            color: #999;
          }
        }
        &:hover {
          opacity: 1;
          span {
            color: #111;
          }
        }
      }
    }
    .tag {
      width: auto;
      display: inline-block;
      padding-right: 20px;
      opacity: 0.3;
      transition: 0.3s all;
      cursor: pointer;
      span {
        color: #999;
      }
      &.active {
        opacity: 1;
        span {
          color: #111;
        }
      }
      .circle {
        width: 7px;
        height: 7px;
        display: inline-block;
        border-radius: 50px;
        vertical-align: middle;
      }
    }
  }

  span a {
    width: 100%;
    position: relative;
    color: #555;
    overflow: hidden;
    padding: 10px 0;
    float: left;
    &[target="_self"]::after,
    &.internal::after {
      content: "";
    }
    &:hover {
      span {
        transform: translateX(25px);
        transition: 0.1s all ease-in-out 0s;
      }
      .arrow .date {
        color: #555;
        transform: translateX(-25px);
        padding-right: 15px;
        transition: 0.1s all ease-in-out 0s;
      }
    }
    &:before {
      content: "";
      background: #eee;
      height: 2px;
      width: 100%;
      display: block;
      position: absolute;
      top: 30px;
      box-shadow: 0px 40px #eee, 0px 80px #eee, 0px 120px #eee, 0px 160px #eee,
        0px 200px #ddd;
    }

    .circle {
      width: 10px;
      height: 10px;
      position: absolute;
      left: 0;
      top: 26px;
      z-index: 2;
      border-radius: 50px;
      box-shadow: 0 0 0 15px white;
    }

    span {
      transition: 0.3s all ease-in-out 0.05s;
      display: inline-block;
      text-shadow: -5px 0px 0 white, -4px 0px 0 white, -3px 0px 0 white,
        -2px 0px 0 white, -1px 0px 0 white, 0px 0px 0 white, 1px 0px 0 white,
        2px 0px 0 white, 3px 0px 0 white, 4px 0px 0 white, 5px 0px 0 white,
        6px 0px 0 white, 7px 0px 0 white, 8px 0px 0 white, 9px 0px 0 white,
        10px 0px 0 white, 11px 0px 0 white, 12px 0px 0 white, 13px 0px 0 white,
        14px 0px 0 white, 15px 0px 0 white, 16px 0px 0 white, 17px 0px 0 white,
        18px 0px 0 white, 19px 0px 0 white, 20px 0px 0 white, 21px 0px 0 white,
        22px 0px 0 white, 23px 0px 0 white, 24px 0px 0 white, 25px 0px 0 white;
      position: relative;
      z-index: 3;
      width: calc(100% - 60px);
    }

    .arrow {
      display: inline-block;
      position: absolute;
      right: 0;
      bottom: 50px;
      color: #eee;
      min-width: 60px;
      .date {
        position: absolute;
        right: 0;
        padding-left: 15px;
        background: white;
        z-index: 3;
        transition: 0.3s all ease-in-out 0.05s;
        white-space: nowrap;
      }
      &::after {
        background: white;
        content: "";
        width: 14px;
        height: 16px;
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTQgMTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6I0VFRUVFRTt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTMuNyw4TDcsMC40TDUuMywxLjlsMy4yLDMuNUM5LjIsNi4xLDkuOCw2LjcsMTAuMyw3SDB2MmgxMC4zQzkuOSw5LjIsOS42LDkuNCw5LjQsOS43cy0wLjUsMC41LTAuOSwxbC0zLjIsMy41TDcsMTUuNkwxMy43LDh6Ii8+PC9zdmc+);
        position: absolute;
        right: 0;
        z-index: 2;
        display: block;
        font-weight: 200;
        top: 13px;
      }
    }
  }
}
</style>
