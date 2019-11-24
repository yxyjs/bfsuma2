<template>
  <div id="login-cont">
    <p class="welcome">Welcome</p>
    <div class="login-main">
      <div class="login-banner">
        <img src="../../../static/img/login_banner.png" />
      </div>
      <div class="login-form">
        <ValidationObserver v-slot="{ handleSubmit }" tag="div">
          <form action="#" @submit.prevent="handleSubmit(onSubmit)" class="form-wrap-box">
            <!-- *account -->
            <section class="form-item">
              <ValidationProvider name="Account" rules="required" v-slot="{ errors }">
                <label class="item-lable">Account</label>
                <div class="form-item-top">
                  <div class="item-main">
                    <input
                      class="item-main-inner"
                      type="text"
                      placeholder="*Your E-mail /Phone number / Distributor ID"
                      :class="showHelpBlock ? 'show-help' : ''"
                      v-model="account"
                      autofocus
                      @input="inputChange"
                    />
                  </div>
                </div>
                <div class="form-item-bottom">
                  <small
                    ref="showHelpBlock"
                    class="help-block"
                    v-show="showHelpBlock"
                  >* Enter your E-mail /Phone number / Distributor ID</small>
                  <small
                    ref="loginError"
                    class="help-block"
                    style="display:none"
                  >User ID / Distributor ID does not exist, please re-enter</small>
                </div>
              </ValidationProvider>
            </section>
            <!-- Password -->
            <section class="form-item">
              <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
                <label class="item-lable">Password</label>
                <div class="form-item-top">
                  <div class="item-main">
                    <input
                      class="item-main-inner"
                      :type="!showPassword ? 'password' : 'text'"
                      placeholder="*Fill in"
                      :class="showHelpBlock1 ? 'show-help' : ''"
                      v-model="password"
                      oninput="if(value.length>15)value=value.slice(0,15)"
                      @input="inputChange"
                    />
                    <i
                      class="item-icon iconfont icon-yanjing"
                      v-show="isSeePwd"
                      @click="showPassword = !showPassword"
                    ></i>
                  </div>
                </div>
                <div class="form-item-bottom">
                  <small
                    ref="showHelpBlock1"
                    class="help-block"
                    v-show="showHelpBlock1"
                  >* Enter password！</small>
                  <small
                    ref="loginError1"
                    class="help-block"
                    style="display:none"
                  >Password error, please re-enter</small>
                </div>
              </ValidationProvider>
            </section>
            <section class="form-rem-for">
              <div class="remember">
                <input
                  class="checkbox"
                  type="checkbox"
                  name="remember"
                  id="remember"
                  value="Remember Password"
                  v-model="rememberPwd"
                />
                <img class="checked-img" src="../../../static/img/checked.png" alt />
                <img class="remember-img" src="../../../static/img/check_box.png" alt />
                <label class="remember-label" for="remember">Remember Password</label>
              </div>
              <a
                href="javascript:;"
                class="forgot"
                @click="$router.push('/findPassword')"
              >Forgot Password？</a>
            </section>
            <!-- btn -->
            <section class="form-btns">
              <button
                type="submit"
                class="btn btn-login"
                :disabled="disabled"
                @click.prevent="onSubmit"
              >Login</button>
              <button
                type="button"
                class="btn btn-cancel"
                @click="$router.replace('/register')"
              >Cancel</button>
            </section>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { distributorLogin } from "@/api/index";
export default {
  data() {
    return {
      disabled: false,
      showHelpBlock: false,
      showHelpBlock1: false,
      showPassword: false,
      rememberPwd: false,
      account: "",
      password: ""
    };
  },
  computed: {
    isSeePwd() {
      return this.password.trim();
    }
  },
  watch: {
    account(val) {
      if (!val.trim()) {
        this.showHelpBlock = true;
      } else {
        this.showHelpBlock = false;
        if (this.disabled) this.disabled = false;
      }
    },
    password(val) {
      if (!val.trim()) {
        this.showHelpBlock1 = true;
      } else {
        this.showHelpBlock1 = false;
        if (this.disabled) this.disabled = false;
      }
    }
  },
  methods: {
    async distributorLogin() {
      const { account, password, rememberPwd } = this;
      let res = await distributorLogin({ account, password, rememberPwd });
      console.log(res);
      if (res) {
        let rescode = res.code;
        this.disabled = true;
        if (rescode === 0) {
          // 成功
          sessionStorage.setItem("user", JSON.stringify(res.data));
          // 判断是顾客还是经销商
          if (res.data.userType == "customer") {
            this.$router.push("/register/distributor/personal");
          } else {
            let backstageUrl = "http://report.bfsuma.com";
            let user = {
              distributorNo: "111",
              password: this.password
            };
            window.location.href =
              backstageUrl +
              "/login.jsp?account=" +
              user.distributorNo +
              "&password=" +
              user.password;
          }
        }
        if (rescode === 101) {
          //
          this.$refs.loginError.style.display = "block";
          this.$refs.loginError1.style.display = "block";
          // this.inputChange(true);
        }
      }
    },
    onSubmit() {
      const { account, password } = this;
      if (account.trim() && password.trim()) {
        // 登录
        this.distributorLogin();
        this.disabled = true;
      } else {
        !account.trim()
          ? (this.showHelpBlock = true)
          : (this.showHelpBlock = false);
        !password.trim()
          ? (this.showHelpBlock1 = true)
          : (this.showHelpBlock1 = false);
      }
    },
    inputChange(flag) {
      if (flag) {
        this.showHelpBlock = false;
        this.showHelpBlock1 = false;
      } else {
        this.showHelpBlock = true;
        this.showHelpBlock1 = true;
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus">
#login-cont
  .welcome
    color #5BA2CC
    font-size 36px
    margin 20px
  .login-main
    display flex
    .login-banner
      flex 0.4
      max-width 50%
      padding 150px 30px
      img
        max-width 100%
    .login-form
      flex 0.6
      padding 0 0 0 120px
      .form-wrap-box
        border-top 4px solid #529ECB
        background-color #fff
        padding 40px 60px 40px 40px
        box-shadow 0px 4px 40px 0px rgba(204, 204, 204, 0.1)
        @media (max-width: 980px)
          display block
          margin 0
        .form-item
          flex 1
          margin-bottom 15px
          &.margin-l
            margin-left 20px
            @media (max-width: 980px)
              margin-left 0
          @media (max-width: 980px)
            margin 12px 0
            background-color #fff
            flex-direction column
          .item-lable
            color #575757
            font-weight bold
            font-size 18px
            @media (max-width: 980px)
              margin-left 0
              border-right none
          .form-item-top
            display flex
            height 50px
            line-height 50px
            background-color #E6F0F3
            margin-top 30px
            border-radius 4px
            @media (max-width: 980px)
              display flex
              flex-direction column
            .item-p
              line-height 40px
              padding-right 10px
              background-color #fff
            .item-main
              flex 1
              display flex
              align-items center
              color rgb(87, 87, 87)
              @media (max-width: 980px)
                padding-top 4px
                line-height 36px
                background-color #E6F0F3
              span
                margin-left 15px
              .item-main-inner
                flex 1
                height 100%
                color rgb(87, 87, 87)
                padding-left 10px
                border-radius 4px
                &::placeholder
                  color #5BA2CC
                &.show-help
                  box-shadow rgb(255, 174, 174) 0px 0px 0px 100px inset
                  &::placeholder
                    color #fff
              .item-searchbtn
                height 100%
                color #fff
                background-color #5ba2cc
                border-radius 4px
                padding 0 8px
          .form-item-bottom
            height 20px
            line-height 20px
            .help-block
              color #a94442
              font-weight normal
              @media (max-width: 980px)
                display none
                margin-top 4px
        .form-rem-for
          display flex
          justify-content space-between
          .remember
            display flex
            align-items center
            transform translate(-18px)
            .checkbox
              display none
              &:checked+img
                opacity 1
            .checked-img
              opacity 0
              width 19px
              height 16px
              transform translate(19px)
            .remember-img
              max-width 14px
              height 14px
              margin-right 10px
          .forgot
            color #FF5B5B
        .form-btns
          margin-top 80px
          .btn
            width 100%
            border-radius 4px
            height 50px
            line-height 50px
            margin-top 12px
            margin-right 10px
            background #fff
          .btn-login
            background #5ba2cc
            color #fff
            &:hover
              background #286090
            &:disabled
              filter grayscale(1)
          .btn-cancel
            color #5BA2CC
</style>
