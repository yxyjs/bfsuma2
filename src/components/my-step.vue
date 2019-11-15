<template>
  <div class="page">
    <section class="step">
      <slot></slot>
    </section>
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
.step
  margin-top 10px
  background-color #fff
  text-align center
  @media (max-width: 980px)
    margin-top 0
    background-color #f5f5f5
  img
    height 44px
    padding 10px
    width 100%
    @media (max-width: 980px)
      padding 0
      height auto
</style>
