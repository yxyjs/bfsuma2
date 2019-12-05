<template>
  <div id="login-cont">
    <p class="welcome">Welcome</p>
    <div class="login-main">
      <div class="login-banner">
        <img src="../../../static/img/login_banner.png" />
      </div>
      <div class="login-form">
        <ValidationObserver
          ref="observer"
          @submit.prevent="onSubmit"
          v-slot="{ invalid }"
          tag="form"
          class="form-wrap-box"
        >
          <!-- *account -->
          <ValidationProvider
            name="Account"
            rules="required"
            v-slot="{ errors }"
            tag="section"
            class="form-item"
          >
            <label class="item-lable">Account</label>
            <div class="form-item-top">
              <div class="item-main">
                <input
                  class="item-main-inner"
                  type="text"
                  placeholder="*Your E-mail /Phone number / Distributor ID"
                  v-model.trim="account"
                  autofocus
                  @focus="accountFocus"
                />
              </div>
            </div>
            <div class="form-item-bottom">
              <span class="help-block">{{ errors[0] }}</span>
              <span
                ref="accountError"
                class="other-help"
              >User ID / Distributor ID does not exist, please re-enter</span>
            </div>
          </ValidationProvider>
          <!-- Password -->
          <ValidationProvider
            name="Password"
            rules="required"
            v-slot="{ errors }"
            tag="section"
            class="form-item"
          >
            <label class="item-lable">Password</label>
            <div class="form-item-top">
              <div class="item-main">
                <input
                  class="item-main-inner"
                  :type="!showPassword ? 'password' : 'text'"
                  placeholder="*Fill in"
                  v-model.trim="password"
                  oninput="if(value.length>15)value=value.slice(0,15)"
                  @focus="passwordFocus"
                />
                <i
                  class="item-icon iconfont icon-yanjing"
                  v-show="isSeePwd"
                  @click="showPassword = !showPassword"
                ></i>
              </div>
            </div>
            <div class="form-item-bottom">
              <span class="help-block">{{ errors[0] }}</span>
              <span ref="passwordError" class="other-help">Password error, please re-enter</span>
            </div>
          </ValidationProvider>
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
              <label for="remember" class="remember-label-box">
                <img class="check-box-img" src="../../../static/img/check_box.png" alt />
              </label>
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
            <button type="submit" class="btn btn-login" :disabled="disabled">Login</button>
            <button type="button" class="btn btn-cancel" @click="cancelLogin">Cancel</button>
          </section>
        </ValidationObserver>
      </div>
    </div>
    <mobile-loading :showMobileLoading="showMobileLoading" />
    <my-toast :toastText="toastText" :showToast="showToast" @closeToast="showToast=false"></my-toast>
  </div>
</template>

<script type="text/ecmascript-6">
import { BASE_URL, distributorLogin } from "@/api/index";
import { session } from "@/util/tool";
import myToast from "@/components/my-toast";
import mobileLoading from "@/components/mobile-loading";
export default {
  data() {
    return {
      BASE_URL: BASE_URL,
      disabled: false,
      showPassword: false,
      rememberPwd: false,
      showMobileLoading: false,
      showToast: false,
      account: "",
      password: "",
      toastText: ""
    };
  },
  computed: {
    isSeePwd() {
      return this.password;
    }
  },
  mounted() {
    let userLogin = session.get("userLogin");
    if (userLogin) {
      this.account = userLogin.account;
      this.password = userLogin.password;
      this.rememberPwd = true;
    }
  },
  methods: {
    accountFocus() {
      if (this.$refs.accountError.style.display === "block")
        this.$refs.accountError.style.display = "none";
    },
    passwordFocus() {
      if (this.$refs.passwordError.style.display === "block")
        this.$refs.passwordError.style.display = "none";
    },
    cancelLogin() {
      location.href = this.BASE_URL;
    },
    async distributorLogin() {
      this.showMobileLoading = true;
      const { account, password, rememberPwd } = this;
      let res = await distributorLogin({ account, password, rememberPwd });
      this.showMobileLoading = false;
      const rescode = res.code;
      // this.disabled = true;
      if (rescode === 0) {
        let userInfo = {
          account: account,
          password: password
        };
        if (this.rememberPwd) {
          session.set("userLogin", userInfo);
        }
        const resdata = res.data;
        // 成功
        session.set("user", resdata);
        // 判断是顾客还是经销商
        if (res.data.userType == "customer") {
          this.$router.push("/register/distributor/personal");
        } else {
          let backstageUrl = "http://report.bfsuma.com";
          let user = {
            distributorNo: resdata.distributorNo,
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
        this.showToast = true;
        this.toastText = "Account or password is wrong";
        this.$refs.accountError.style.display = "block";
        this.$refs.passwordError.style.display = "block";
      }
    },
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.showToast = true;
        this.toastText = "Please check required";
        return;
      }
      // 登录
      this.distributorLogin();
    }
  },
  components: {
    "my-toast": myToast,
    "mobile-loading": mobileLoading
  }
};
</script>

<style scoped lang="stylus">
#login-cont
  .welcome
    color #5BA2CC
    font-size 36px
    margin 20px
    @media (max-width: 980px)
      font-size 26px
      margin 8px
  .login-main
    display flex
    .login-banner
      flex 0.4
      max-width 50%
      padding 150px 30px
      @media (max-width: 980px)
        display none
      img
        max-width 100%
    .login-form
      flex 0.6
      padding-left 120px
      @media (max-width: 980px)
        flex 1
        padding-left 0
      .form-wrap-box
        border-top 4px solid #529ECB
        background-color #fff
        padding 40px
        box-shadow 0px 4px 40px 0px rgba(204, 204, 204, 0.1)
        @media (max-width: 980px)
          display block
          padding 0 10px
          margin 0
          border-top none
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
              margin-top 16px
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
              font-size 12px
              color #a94442
              font-weight normal
              @media (max-width: 980px)
                margin-top 4px
            .other-help
              display none
              font-size 12px
              color #a94442
        .form-rem-for
          display flex
          justify-content space-between
          .remember
            display flex
            align-items center
            .checkbox
              position absolute
              display none
              &:checked+img
                opacity 1
            .checked-img
              position absolute
              opacity 0
              width 19px
              height 16px
            .remember-label-box
              position absolute
              .check-box-img
                width 12px
            .remember-label
              margin-left 20px
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
              @media (max-width: 980px)
                background #5ba2cc
            &:disabled
              filter grayscale(1)
          .btn-cancel
            color #5BA2CC
</style>
