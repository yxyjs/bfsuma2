<template>
  <div id="header-cont">
    <div class="header-main">
      <div class="logo">
        <a href="http://www.bfsuma.com">
          <img src="http://www.bfsuma.com/BFWebsite_E/img/logo.png" alt />
        </a>
      </div>

      <div class="link">
        <a
          v-show="$route.path.indexOf('register')!=-1 || $route.path.indexOf('findPassword')!=-1"
          href="javascript:;"
          class="guide"
          @click="$router.push('/login')"
        >Login</a>
        <span v-show="$route.path.indexOf('findPassword')!=-1">|</span>
        <a
          v-show="$route.path.indexOf('login')!=-1 || $route.path.indexOf('findPassword')!=-1"
          href="javascript:;"
          class="guide"
          @click="$router.push('/register')"
        >Register</a>
      </div>
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
#header-cont
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
    .link
      .guide
        text-align right
        margin 10px
        &:hover
          color #22adde
</style>
