<template>
  <div id="loading-cont" v-show="show">
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <p class="loading-text">loading...</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="stylus">
#loading-cont
  text-align center
  margin-top 50px
  .spinner
    margin 0 auto
    width 50px
    height 60px
    text-align center
    font-size 10px
    &>div
      background-color #5BA2CC
      height 100%
      width 6px
      display inline-block
      -webkit-animation stretchdelay 1.2s infinite ease-in-out
      animation stretchdelay 1.2s infinite ease-in-out
    .rect2
      animation-delay -1.1s
    .rect3
      animation-delay -1s
    .rect4
      animation-delay -0.9s
    .rect5
      animation-delay -0.8s
    @keyframes stretchdelay
      0%, 40%, 100%
        transform scaleY(0.4)
        -webkit-transform scaleY(0.4)
      20%
        transform scaleY(1)
        -webkit-transform scaleY(1)
  .loading-text
    color #5BA2CC
    margin-top 10px
</style>
