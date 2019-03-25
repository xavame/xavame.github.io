<template>
  <div id="root">
    <Header />
    <main class="totem">
      <div class="intro">
        <!--<span class="yil">{{ year }}</span> — -->
        <h1>{{ title }}</h1>
        <!--<p class="elevate-cover__description">{{ description }}</p>-->
        <!--
        <ImageResponsive
          :imageURL="'blog/' + id + '/_main.jpg'"
          width="100%"
          class="elevate-cover__img"
          :alt="'Blog picture'" />
        -->
      </div>
      <div class="container small">
        <Markdown
          :render-func="renderFunc"
          :static-render-funcs="staticRenderFuncs" />
      </div>
    </main>
  </div>
</template>

<script lang="js">
  
  import Markdown from "~/components/Markdown.vue"
  import Header from '~/components/Header.vue'

  export default {

    async asyncData ({params, store}) {
      const fileContent = await import(`~/contents/blog/${params.slug}.md`)
      const attr = fileContent.attributes
      return {
        name: params.slug,
        title: attr.title,
        year: attr.year,
        id: attr.id,
        owner: attr.owner,
        colors: attr.colors,
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

    components: { Markdown, Header },

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
      this.audioInit()
    },
    methods: {
      audioInit: () => {
        const $ = (q, e) => {
          const i = typeof e === 'number' ? e : undefined
          const o = typeof e === 'object' ? e : undefined
          const r = o ? o.querySelectorAll(q) : document.querySelectorAll(q)
          if (i !== undefined) {
            return r[i]
          } else if (r.length === 1) {
            return r[0]
          } else {
            return r
          }
        }
        HTMLElement.prototype.find = function(q) {
          return $(q, this)
        }
        HTMLElement.prototype.forEach = function(q, s) {
          return [this].forEach(q, s)
        }

        $('main .audioplayer').forEach((ap, i) => {
          const music = ap.find('audio')
          let duration = music.duration
          const pButton = ap.find('.p')
          const playhead = ap.find('.d')
          const timeline = ap.find('.l')
          const timelineWidth = timeline.offsetWidth - playhead.offsetWidth + 20

          timeline.style.width = timeline.offsetWidth + 'px'

          // play button event listenter
          pButton.addEventListener('click', play)

          // timeupdate event listener
          music.addEventListener('timeupdate', timeUpdate, false)

          // makes timeline clickable
          timeline.addEventListener(
            'click',
            function(event) {
              moveplayhead(event)
              music.currentTime = duration * clickPercent(event)
            },
            false,
          )

          // returns click as decimal (.77) of the total timelineWidth
          function clickPercent(event) {
            return (event.clientX - getPosition(timeline)) / timelineWidth
          }

          // makes playhead draggable
          playhead.addEventListener('mousedown', mouseDown, false)
          window.addEventListener('mouseup', mouseUp, false)

          // Boolean value so that audio position is updated only when the playhead is released
          let onplayhead = false

          // mouseDown EventListener
          function mouseDown() {
            onplayhead = true
            window.addEventListener('mousemove', moveplayhead, true)
            music.removeEventListener('timeupdate', timeUpdate, false)
          }

          // mouseUp EventListener
          // getting input from all mouse clicks
          function mouseUp(event) {
            if (onplayhead === true) {
              moveplayhead(event)
              window.removeEventListener('mousemove', moveplayhead, true)
              // change current time
              music.currentTime = duration * clickPercent(event)
              music.addEventListener('timeupdate', timeUpdate, false)
            }
            onplayhead = false
          }
          // mousemove EventListener
          // Moves playhead as user drags
          function moveplayhead(event) {
            const newMargLeft = event.clientX - getPosition(timeline)

            if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
              playhead.style.marginLeft = newMargLeft + 'px'
            }
            if (newMargLeft < 0) {
              playhead.style.marginLeft = '0px'
            }
            if (newMargLeft > timelineWidth) {
              playhead.style.marginLeft = timelineWidth + 'px'
            }
          }

          // timeUpdate
          // Synchronizes playhead position with current point in audio
          function timeUpdate() {
            const playPercent = timelineWidth * (music.currentTime / duration)
            playhead.style.marginLeft = playPercent + 'px'
            if (music.currentTime === duration) {
              pButton.className = ''
              pButton.className = 'p'
            }
          }

          // Play and Pause
          function play() {
            // start music
            if (music.paused) {
              Array.from($('.audioplayer')).forEach((el, j) => {
                if (i !== j && !el.find('audio').paused) {
                  el.find('audio').pause()
                  el.find('.s').className = 'p'
                }
              })
              music.play()
              // remove play, add pause
              pButton.className = 's'
            } else {
              // pause music
              music.pause()
              // remove pause, add play
              pButton.className = 'p'
            }
          }

          // Gets audio file duration
          music.addEventListener(
            'canplaythrough',
            function() {
              duration = music.duration
            },
            false,
          )

          // getPosition
          // Returns elements left position relative to top-left of viewport
          function getPosition(el) {
            return el.getBoundingClientRect().left
          }
        })
      },
    },
    computed: {
      ogImage: function () {
        return `${process.env.baseUrl}/images/og-banner.png`;
        //return `${process.env.baseUrl}/images/blog/${this.id}/_thumbnail.jpg`;
      },
      pageTitle: function () {
        return this.title + ' – XNB';
      },
    },
    
  }
</script>


<style scoped lang="scss">  
  .page-enter {
    opacity: 0;
    transform: translateX(50px);
  }
  .page-leave-active {
    opacity: 0;
    transform: translateX(50px);
  }
</style>