<template>
  <div class="my-toast" v-if="showToast">
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
.my-toast
  display flex
  align-items center
  position absolute
  top 30px
  left 50%
  transform translate(-50%)
  background-color #f2dede
  border 1px solid #ebccd1
  border-radius 4px
  .toast-text
    font-size 13px
    color #a94442
    padding 16px 100px
  .toast-icon
    font-size 20px
    cursor pointer
    padding 0 10px
    color #aaa
    &:hover
      color #333
</style>
