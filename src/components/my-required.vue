<template>
  <div class="head-tips">
    <p class="tips-text">
      <slot></slot>
    </p>
    <p class="required">*Required</p>
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
.head-tips
  background-color #fff
  .tips-text
    font-size 14px
    font-family PingFang-SC-Bold, PingFang-SC
    font-weight bold
    color #575757
    line-height 30px
    @media (max-width: 980px)
      font-size 13px
      line-height 1.5
      font-weight normal
      padding 10px
  .required
    margin 12px 0 0 0
    color #5BA2CC
</style>
