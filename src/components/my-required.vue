<template>
  <div class="page">
    <p class="form-tips">
      <slot></slot>
    </p>
    <p class="required-title">*Required</p>
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
.form-tips
  font-size 14px
  font-family PingFang-SC-Bold, PingFang-SC
  font-weight bold
  color #575757
  line-height 30px
.required-title
  margin 12px 0 0 0
  color #5BA2CC
</style>
