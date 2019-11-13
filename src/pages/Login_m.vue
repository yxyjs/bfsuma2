<template>
  <div class="login">
    <h2 class="login-title">Welcome</h2>
    <form @submit.prevent="doLogin" class="form" action="/">
      <div class="form-item">
        <i class="form-item-icon iconfont icon-zhanghu"></i>
        <input type="text" placeholder="Account" v-model="formParams.account" />
      </div>
      <div class="form-item">
        <i class="form-item-icon iconfont icon-mima1"></i>
        <input type="password" placeholder="Password" v-model="formParams.password" />
      </div>
    </form>
    <div class="forgot">
      <van-checkbox v-model="checked" @click="rememberPwd">
        <span class="remember-pwd">Remember Password</span>
      </van-checkbox>
      <button class="forgot-btn" @click="goFindPwd">Forgot Password</button>
    </div>
    <button class="login-btn" :class="{'gray':disabled}" type="submit">Login</button>
  </div>
</template>

<script type="text/ecmascript-6">
import { Checkbox } from "vant";
export default {
  data() {
    return {
      checked: false,
      formParams: {
        account: "",
        password: ""
      }
    };
  },
  computed: {
    disabled() {
      if (!this.formParams.account.trim() || !this.formParams.password.trim())
        return true;
    }
  },
  methods: {
    // 登录
    doLogin() {
      console.log("doLogin");
    },
    // 记住密码
    rememberPwd() {
      localStorage.setItem("accPwd", JSON.stringify(this.formParams));
    },
    // 找回密码
    goFindPwd() {
      this.$router.push("/findPwd");
    }
  },
  components: {
    "van-checkbox": Checkbox
  }
};
</script>

<style scoped lang="stylus">
@import '../../static/stylus/mobile'

.login
  .login-title
    margin 0.2rem 0 0.15rem 0.2rem
    color $page-three-color
  .form
    margin 0 0.18rem
    .form-item
      position relative
      .form-item-icon
        position absolute
        top 50%
        transform translateY(-50%)
        color $border-color
        font-size 0.2rem
      input
        width 100%
        text-indent 0.3rem
        line-height 0.52rem
        color $border-color
        border-bottom 1px solid $border-color
  .forgot
    display flex
    justify-content space-between
    margin 0.16rem 0.18rem
    font-size 0.12rem
    font-weight 600
    .remember-pwd
      color $border-color
    .forgot-btn
      color $page-three-color
  .login-btn
    position fixed
    bottom 0
    width 100%
    height 0.6rem
    color #fff
    font-weight bold
    background-color $page-three-color
    text-align center
    &.gray
      filter grayscale(1)
</style>
