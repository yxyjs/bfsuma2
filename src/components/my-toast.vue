<template>
  <div id="toast-cont" v-if="showToast">
    <p class="toast-text">{{toastText}}</p>
    <i class="toast-icon iconfont icon-del-" @click="closeToast"></i>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    toastText: {
      type: String,
      required: true
    },
    showToast: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {
    showToast(val) {
      if (val) {
        setTimeout(() => {
          this.closeToast();
        }, 3000);
      }
    }
  },
  methods: {
    closeToast() {
      this.$emit("closeToast");
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus">
@keyframes slidein
  from
    transform translateY(-20px)
  to
    transform translateY(0)
#toast-cont
  display flex
  align-items center
  position fixed
  top 0
  left 0
  right 0
  padding 20px 0
  background-color #f2dede
  animation slidein 0.25s ease-in-out
  @media (max-width: 980px)
    padding 10px 0
  z-index 3
  .toast-text
    flex 1
    text-align center
    font-size 14px
    color #a94442
  .toast-icon
    position absolute
    right 0
    font-size 20px
    cursor pointer
    padding 0 10px
    color #aaa
    &:hover
      color #333
</style>
