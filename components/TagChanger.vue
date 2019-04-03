<template>
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
</template>

<script>
export default {
  name: "TagChanger",
  props: {
    activeTag: {
      type: String,
      default: "all"
    },
    tags: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tagChange: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style scoped lang="scss">
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
</style>
