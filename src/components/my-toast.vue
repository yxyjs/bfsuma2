<template>
  <div id="toast-cont" :class="{'slide-in':showToast}">
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
      default: false,
      required: true
    }
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
  0%
    transform translateY(-51px)
  25%, 75%
    transform translateY(0)
  100%
    transform translateY(-51px)
#toast-cont
  display flex
  align-items center
  position fixed
  top 0
  transform translateY(-51px)
  left 0
  right 0
  padding 15px 0
  background-color #f2dede
  z-index 3
  &.slide-in
    animation slidein 3s ease-in-out
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
