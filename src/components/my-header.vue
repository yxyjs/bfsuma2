<template>
  <header class="header">
    <p class="header-title">Become a Distributor</p>
    <p class="header-crumbs">You are here：Home / Register / Distributor Register</p>
  </header>
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
.header
  display flex
  justify-content space-between
  margin-top 32px
  line-height 50px
  @media (max-width: 980px)
    display none
  .header-title
    font-size 36px
    font-family PingFang-SC-Bold, PingFang-SC
    color #5BA2CC
    @media (max-width: 980px)
      font-size 16px
  .header-crumbs
    font-family PingFang-SC-Bold, PingFang-SC
    color #9A9A9A
</style>
