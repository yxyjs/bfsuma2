<template>
  <div class="dialog">
    <!--外层的遮罩 点击事件用来关闭弹窗，isShow控制弹窗显示 隐藏的props-->
    <div class="dialog-cover back" v-if="isShow"></div>
    <!-- transition 这里可以加一些简单的动画效果 -->
    <transition name="drop">
      <!--style 通过props 控制内容的样式  -->
      <div
        class="dialog-content"
        :style="{top:topDistance+'%',width:widNum+'%',left:leftSite+'%'}"
        v-if="isShow"
      >
        <div class="dialog_main" :style="{paddingTop:pdt+'px',paddingBottom:pdb+'px'}">
          <!--弹窗的内容-->
          <slot></slot>
        </div>
        <!--弹窗操作按钮-->
        <div class="foot-buttons">
          <button
            class="foot-button button-confirm"
            :style="{backgroundColor:bgc}"
            @click="confirmHandle"
          >Confirm</button>
          <button class="foot-button button-cancel" @click="cancelHandle">Cancel</button>
        </div>
      </div>
    </transition>
  </div>
</template> 

<script>
/** 弹窗组件*/
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    widNum: {
      type: Number,
      default: 86.5
    },
    leftSite: {
      // 左定位
      type: Number,
      default: 6.5
    },
    topDistance: {
      //top上边距
      type: Number,
      default: 10
    },
    pdt: {
      //上padding
      type: Number,
      default: 0
    },
    pdb: {
      //下padding
      type: Number,
      default: 0
    },
    bgc: {
      //背景色
      type: String,
      default: "pink"
    }
  },
  methods: {
    confirmHandle() {
      this.$emit("on-confirm");
    },
    cancelHandle() {
      this.$emit("on-cancel");
    }
  }
};
</script>
<style lang="stylus" scoped>
/* * 弹窗动画 */
.drop-enter-active
  // 动画进入过程：0.5s
  transition all 0.5s ease
.drop-leave-active
  // 动画离开过程：0.5s
  transition all 0.3s ease
.drop-enter
  // 动画之前的位置
  transform translateY(-500px)
.drop-leave-active
  // 动画之后的位置
  transform translateY(-500px)
// 最外层 设置position定位
.dialog
  position relative
  color #2e2c2d
  font-size 16px
// 遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩
.dialog-cover
  background rgba(0, 0, 0, 0.8)
  position fixed
  z-index 200
  top 0
  left 0
  width 100%
  height 100%
// 内容层 z-index要比遮罩大，否则会被遮盖，
.dialog-content
  position fixed
  z-index 300
  border-radius 9px
  background-color #fff
  .dialog_main
    // 主体内容样式设置
    background #ffffff
    display flex
    justify-content center
    align-content space-between
    width 100%
    border-radius 9px
  .foot-buttons
    text-align center
    .foot-button
      width 90%
      font-size 0.18rem
      line-height 0.49rem
      border-radius 25px
    .button-confirm
      color #fff
    .button-cancel
      color #CFD3D2
</style>