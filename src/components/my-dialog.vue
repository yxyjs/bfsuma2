<template>
  <div id="dialog-cont" v-if="showDialog">
    <div class="dialog-wrap">
      <header>
        <h2>{{ title }}</h2>
      </header>
      <main class="dialog-main">
        <slot name="dialog-text"></slot>
        <slot name="dialog-table"></slot>
      </main>
      <i class="dialog-icon iconfont icon-del-" @click.prevent="closeDialog"></i>
      <footer class="dialog-buttons">
        <div class="buttons-item" v-show="showCancel">
          <button class="btn btn-cancel" @click.prevent="dialogHandle(false)">Cancel</button>
        </div>
        <div class="buttons-item">
          <button class="btn btn-confirm" @click.prevent="dialogHandle(true)">Confirm</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      required: false
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    dialogHandle(flag) {
      this.$emit("dialogHandle", flag);
    },
    closeDialog() {
      this.$emit("closeDialog");
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus">
#dialog-cont
  position fixed
  top 0
  left 0
  margin auto
  width 100vw
  min-height 100vh
  text-align center
  background-color rgba(0, 0, 0, 0.3)
  z-index 2
  @media (max-width: 980px)
    background-color rgba(0, 0, 0, 0.5)
  .dialog-wrap
    position absolute
    top 50%
    left 50%
    transform translate(-50%) translateY(-50%)
    width 50%
    padding 0 50px
    background-color #fff
    border-radius 10px
    @media (max-width: 980px)
      width 80%
      padding 0 10px
    h2
      color #56a7d8
      text-align center
      margin 25px 0
    .dialog-main
      text-align left
      font-size 16px
      line-height 32px
      @media (max-width: 980px)
        font-size 12px
        line-height 26px
      .dialog-text
        font-weight bold
        a
          display block
          color #56a7d8
          @media (max-width: 980px)
            margin 10px 0 0 10px
      .dialog-table
        margin-top 20px
    .dialog-icon
      position absolute
      right 20px
      top 20px
      font-size 26px
      color #ccc
      cursor pointer
      &:hover
        color #aaa
    .dialog-buttons
      display flex
      justify-content space-between
      margin 30px
      @media (max-width: 980px)
        margin 20px 0 0 0
      .buttons-item
        flex 1
        text-align center
        .btn
          font-size 16px
          font-weight bold
          width 140px
          padding 20px
          color #fff
          border-radius 4px
          @media (max-width: 980px)
            width 100%
            border-radius 0
        .btn-cancel
          background-color #ddd
          &:hover
            background-color #bbb
        .btn-confirm
          background-color #56a7d8
          &:hover
            background-color #286090
</style>
