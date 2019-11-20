<template>
  <div class="header-cont">
    <div class="header-main">
      <div class="logo">
        <a href="http://www.bfsuma.com">
          <img src="http://www.bfsuma.com/BFWebsite_E/img/logo.png" alt />
        </a>
      </div>
      <div class="guide">Login</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="stylus">
.header-cont
  background-color #fff
  padding 10px 0 20px 0
  @media (max-width: 980px)
    display none
  .header-main
    display flex
    justify-content space-between
    margin auto
    max-width 1120px
    .logo
      width 175px
      a
        display block
        >img
          max-width 100%
    .guide
      text-align right
</style>
