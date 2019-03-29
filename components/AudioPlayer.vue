<template>
  <div class="audioplayer">
    <audio preload="true" ref="audio">
      <source :src="src">
    </audio>
    <button class="p" ref="p">
      <div class="b" />
    </button>
    <div class="l" ref="l">
      <div class="d" ref="d" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String
    }
  },
      mounted: function(){
          const music = this.$refs.audio
          let duration = music.duration
          const pButton = this.$refs.p
          const playhead = this.$refs.d
          const timeline = this.$refs.l
          const timelineWidth = (timeline.offsetWidth - 20) - playhead.offsetWidth + 20

          timeline.style.width = (timeline.offsetWidth - 20) + 'px'

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

          function play() {
            if (music.paused) {
              music.play()
              pButton.className = 's'
            } else {
              music.pause()
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
      },
  
}
</script>