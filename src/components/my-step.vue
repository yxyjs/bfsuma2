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
  img
    height 44px
    padding 10px
</style>
