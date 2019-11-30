<template>
  <div id="loading-cont" v-show="showMobileLoading">
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    showMobileLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="stylus">
#loading-cont
  .spinner
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    margin auto
    background-color rgba(0, 0, 0, 0.5)
    width 100px
    height 70px
    text-align center
    font-size 10px
    z-index 3
    &>div
      background-color #fff
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
</style>
