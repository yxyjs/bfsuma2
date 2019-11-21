<template>
  <header id="header-cont">
    <p class="header-title">{{ title }}</p>
    <p class="header-crumbs">
      You are here：
      <a href="http://www.bfsuma.com/">Home /</a>
      <slot></slot>
    </p>
  </header>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: "Become a Distributor"
    }
  },
  data() {
    return {};
  },
  mounted() {},
  components: {}
};
</script>

<style scoped lang="stylus">
#header-cont
  display flex
  justify-content space-between
  margin-top 32px
  line-height 50px
  @media (max-width: 980px)
    display none
  .header-title
    font-size 36px
    color #5BA2CC
    @media (max-width: 980px)
      font-size 16px
  .header-crumbs
    color #9A9A9A
</style>
