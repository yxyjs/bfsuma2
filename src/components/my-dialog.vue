<template>
  <div id="dialog-cont" v-if="showDialog" :class="{'fade-in':showDialog}">
    <div class="dialog-mask" @click="closeDialog"></div>
    <div class="dialog-wrap">
      <header class="header">
        <p class="dialog-title">{{ title }}</p>
      </header>
      <main class="dialog-main">
        <slot name="dialog-text"></slot>
        <slot name="dialog-table"></slot>
        <slot name="dialog-img"></slot>
      </main>
      <i v-show="showClose" class="dialog-icon iconfont icon-del-" @click.prevent="closeDialog"></i>
      <footer class="dialog-buttons">
        <div class="buttons-item" v-show="showCancel">
          <button class="btn btn-cancel" type="button" @click="dialogHandle(false)">Cancel</button>
        </div>
        <div class="buttons-item">
          <button class="btn btn-confirm" type="button" @click="dialogHandle(true)">Confirm</button>
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
    },
    showClose: {
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
@keyframes fadein
  from
    opacity 0
  to
    opacity 1
#dialog-cont
  &.fade-in
    animation fadein .25s ease-in-out
  .dialog-mask
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    margin auto
    background-color rgba(0, 0, 0, 0.3)
    z-index 2
    @media (max-width: 980px)
      background-color rgba(0, 0, 0, 0.5)
  .dialog-wrap
    position fixed
    top 50%
    left 50%
    transform translate(-50%) translateY(-50%)
    width 50%
    z-index 3
    background-color #fff
    border-radius 10px
    overflow hidden
    @media (max-width: 980px)
      width 80%
    .header
      .dialog-title
        font-size 20px
        font-weight bold
        color #56a7d8
        text-align center
        margin 25px 0
        @media (max-width: 980px)
          font-size 16px
          margin 10px 0 15px 0
    .dialog-main
      text-align left
      font-size 16px
      line-height 32px
      padding 0 10px
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
        @media (max-width: 980px)
          margin-top 0
      .dialog-img
        text-align center
        color #d04848
        @media (max-width: 980px)
          margin-top 10px
        i
          font-size 70px
          @media (max-width: 980px)
            font-size 50px
    .dialog-icon
      position absolute
      right 20px
      top 20px
      font-size 26px
      color #ccc
      cursor pointer
      @media (max-width: 980px)
        right 10px
        top 6px
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
            padding 10px
            border-radius 0
        .btn-cancel
          background-color #ddd
          &:hover
            background-color #bbb
            @media (max-width: 980px)
              background #ddd
        .btn-confirm
          background-color #56a7d8
          &:hover
            background-color #286090
            @media (max-width: 980px)
              background #56a7d8
</style>
