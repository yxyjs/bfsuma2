<template>
  <div id="find-cont">
    <p class="welcome">Find Password</p>
    <div class="find-main">
      <div class="find-banner">
        <img src="../../../static/img/login_banner.png" />
      </div>
      <div class="find-form">
        <form class="form" action="#" @submit.prevent="submitHandle">
          <p class="form-title">Find Password</p>
          <!-- *Country -->
          <div class="form-wrap-box">
            <section class="form-item">
              <div class="form-item-top">
                <label class="item-lable">Country</label>
                <div class="item-main">
                  <select
                    ref="showHelpBlock"
                    class="item-main-inner"
                    v-model="formParams.country"
                    :class="showHelpBlock ? 'show-help' : ''"
                    @input="selectChange('country')"
                  >
                    <option disabled value style="display:none;">Select Country</option>
                    <option
                      :value="country.value"
                      v-for="(country, index) in countryList"
                      :key="index"
                    >{{ country.text }}</option>
                  </select>
                </div>
              </div>
              <div class="form-item-bottom">
                <small ref="countryEmpty" class="help-block">* Select country！</small>
              </div>
            </section>
          </div>
          <!-- Phone -->
          <div class="form-wrap-box">
            <section class="form-item">
              <div class="form-item-top">
                <label class="item-lable">Phone</label>
                <div class="item-main">
                  <select
                    class="item-main-inner"
                    name="phoneHead"
                    id="phoneHead"
                    :class="showHelpBlock1 ? 'show-help' : ''"
                    v-model="formParams.phoneHead"
                    @input="selectChange('phone')"
                  >
                    <option disabled value style="display: none;">Aera Cod</option>
                    <option value="254">254</option>
                    <option value="234">234</option>
                    <option value="255">255</option>
                    <option value="256">256</option>
                    <option value="264">264</option>
                    <option value="233">233</option>
                    <option value="237">237</option>
                    <option value="229">229</option>
                  </select>
                </div>
              </div>
              <div class="form-item-bottom">
                <small ref="phoneEmpty" class="help-block">* Enter phone！</small>
                <small ref="phoneFormatErr" class="help-block">Format Error</small>
                <small ref="phoneNotValid" class="help-block">Please enter a valid number</small>
              </div>
            </section>
            <div class="form-item" style="margin-left:16px">
              <div class="form-item-top">
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    type="number"
                    placeholder="Phone Number"
                    v-model="formParams.phoneBody"
                    maxlength="9"
                    oninput="if(value.length>9)value=value.slice(0,9)"
                    :class="showHelpBlock2 ? 'show-help' : ''"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- code -->
          <div class="form-wrap-box">
            <section class="form-item">
              <div class="form-item-top">
                <label class="item-lable">Code</label>
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    style="border-right:40px solid #fff"
                    type="number"
                    placeholder="Short Message Verification Code"
                    v-model="formParams.code"
                    maxlength="9"
                    oninput="if(value.length>6)value=value.slice(0,6)"
                    :class="showHelpBlock3 ? 'show-help' : ''"
                  />
                  <button
                    type="button"
                    class="btn btn-getcode"
                    :disabled="!codeDisabled"
                    @click="getCode"
                  >Get Code</button>
                </div>
              </div>
              <div class="form-item-bottom">
                <small ref="codeNotEmpty" class="help-block">* Enter code！</small>
                <small ref="codeFailed" class="help-block">Failed to send text message</small>
                <small ref="codePhoneEmpty" class="help-block">Cell phone number cannot be empty</small>
                <small ref="codePhoneError" class="help-block">Phone number format error</small>
              </div>
            </section>
          </div>
          <!-- prePassword -->
          <div class="form-wrap-box">
            <section class="form-item">
              <div class="form-item-top">
                <label class="item-lable">Password</label>
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    :type="!showPrePassword ? 'password' : 'text'"
                    placeholder="8~15 character,at least one letter and one number"
                    v-model="formParams.prePassword"
                    maxlength="15"
                    :class="showHelpBlock4 ? 'show-help' : ''"
                  />
                  <i
                    class="item-icon iconfont icon-yanjing"
                    v-show="isSeePre"
                    @click="showPrePassword = !showPrePassword"
                  ></i>
                </div>
              </div>
              <div class="form-item-bottom">
                <small ref="prePwdError" class="help-block">Please enter a value with valid length</small>
              </div>
            </section>
          </div>
          <!-- 密码校验 -->
          <div class="error-item">
            <p>
              <i ref="characterErr" class="error-icon iconfont icon-del-"></i>
              <i ref="characterPass" class="error-icon iconfont icon-duigou"></i>
              8~15 character
            </p>
            <p>
              <i ref="letterErr" class="error-icon iconfont icon-del-"></i>
              <i ref="letterPass" class="error-icon iconfont icon-duigou"></i>
              At least one letter
            </p>
            <p>
              <i ref="numberErr" class="error-icon iconfont icon-del-"></i>
              <i ref="numberPass" class="error-icon iconfont icon-duigou"></i>
              At least one number
            </p>
          </div>
          <!-- Confirm -->
          <div class="form-wrap-box">
            <section class="form-item">
              <div class="form-item-top">
                <label class="item-lable">Confirm</label>
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    :type="!showPassword ? 'password' : 'text'"
                    placeholder="Reenter Password"
                    v-model="formParams.password"
                    :class="showHelpBlock5 ? 'show-help' : ''"
                    maxlength="15"
                  />
                  <i
                    class="item-icon iconfont icon-yanjing"
                    v-show="isSeeConfirm"
                    @click="showPassword = !showPassword"
                  ></i>
                </div>
              </div>
              <div class="form-item-bottom">
                <small ref="passwordError" class="help-block">Please enter a value with valid length</small>
              </div>
            </section>
          </div>
          <div class="error-item">
            <p>
              <i ref="confirmErr" class="error-icon iconfont icon-del-"></i>
              <i ref="confirmPass" class="error-icon iconfont icon-duigou"></i>
              Passwords must match
            </p>
          </div>
          <!-- btn -->
          <section class="form-btns">
            <button
              type="button"
              class="btn btn-cancel"
              @click="$router.go(-1)"
              :disabled="disabled"
            >Cancel</button>
            <button type="submit" class="btn btn-submit" @click.prevent="submitHandle">Submit</button>
          </section>
        </form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getTelCode } from "@/api/index";
export default {
  data() {
    return {
      showPrePassword: false,
      showPassword: false,
      showHelpBlock: false,
      showHelpBlock1: false,
      showHelpBlock2: false,
      showHelpBlock3: false,
      showHelpBlock4: false,
      showHelpBlock5: false,
      disabled: false,
      // codeDisabled: false,
      formParams: {
        country: "",
        phone: "",
        code: "",
        prePassword: "",
        password: "",
        phoneHead: "",
        phoneBody: ""
      },
      countryList: [
        { text: "Kenya", value: "Kenya" },
        { text: "Cameroon", value: "Cameroon" },
        { text: "China", value: "China" },
        { text: "Ghana", value: "Ghana" },
        { text: "Benin", value: "Benin" },
        { text: "Nigeria", value: "Nigeria" },
        { text: "Tanzania", value: "Tanzania" },
        { text: "Uganda", value: "Uganda" },
        { text: "Zambia", value: "Zambia" }
      ]
    };
  },
  computed: {
    isPasswordEqual() {
      const { prePassword, password } = this.formParams;
      if (prePassword.trim()) {
        return prePassword.trim() === password.trim();
      }
    },
    computedPhone() {
      const { phoneHead, phoneBody } = this.formParams;
      return phoneHead + phoneBody.trim();
    },
    isSeePre() {
      const { prePassword } = this.formParams;
      return prePassword.trim();
    },
    isSeeConfirm() {
      const { password } = this.formParams;
      return password.trim();
    },
    codeDisabled() {
      const { computedPhone } = this;
      return computedPhone && computedPhone.length === 12;
    }
  },
  watch: {
    formParams: {
      handler() {
        const {
          country,
          phone,
          code,
          prePassword,
          password,
          phoneHead,
          phoneBody
        } = this.formParams;
        // country
        if (!country) {
          this.showHelpBlock = true;
        } else {
          this.showHelpBlock = false;
          this.$refs.countryEmpty.style.display = "none";
        }
        // phoneHead
        if (!phoneHead) {
          this.showHelpBlock1 = true;
        } else {
          this.showHelpBlock1 = false;
          this.$refs.phoneEmpty.style.display = "none";
        }
        // phoneBody
        if (!phoneBody.trim()) {
          this.showHelpBlock2 = true;
        } else {
          this.showHelpBlock2 = false;
          this.$refs.phoneEmpty.style.display = "none";
        }
        // code
        if (!code.trim()) {
          this.showHelpBlock3 = true;
        } else {
          this.showHelpBlock3 = false;
          this.$refs.codeNotEmpty.style.display = "none";
        }
        // prePassword
        if (!prePassword.trim()) {
          this.showHelpBlock4 = true;
          this.$refs.prePwdError.display = "block";
        } else {
          this.showHelpBlock4 = false;
          // 长度检测
          if (/^[a-zA-Z0-9]{8,15}$/.test(prePassword)) {
            this.$refs.characterPass.style.display = "block";
            this.$refs.characterErr.style.display = "none";
          } else {
            this.$refs.characterPass.style.display = "none";
            this.$refs.characterErr.style.display = "block";
          }
          // 字母检测
          if (/[a-zA-Z]/.test(prePassword)) {
            this.$refs.letterPass.style.display = "block";
            this.$refs.letterErr.style.display = "none";
          } else {
            this.$refs.letterPass.style.display = "none";
            this.$refs.letterErr.style.display = "block";
          }
          // 数字检测
          if (/[0-9]/.test(prePassword)) {
            this.$refs.numberPass.style.display = "block";
            this.$refs.numberErr.style.display = "none";
          } else {
            this.$refs.numberPass.style.display = "none";
            this.$refs.numberErr.style.display = "block";
          }
          if (this.isPasswordEqual) {
            this.$refs.confirmErr.style.display = "none";
            this.$refs.confirmPass.style.display = "block";
          } else {
            this.$refs.confirmErr.style.display = "block";
            this.$refs.confirmPass.style.display = "none";
          }
        }
        // password
        if (!password.trim()) {
          this.showHelpBlock5 = true;
          this.$refs.confirmErr.display = "block";
        } else {
          this.showHelpBlock5 = false;
          if (this.isPasswordEqual) {
            this.$refs.confirmErr.style.display = "none";
            this.$refs.confirmPass.style.display = "block";
          } else {
            this.$refs.confirmErr.style.display = "block";
            this.$refs.confirmPass.style.display = "none";
          }
        }
      },
      deep: true
    }
  },
  methods: {
    selectChange(item) {
      // console.log(item);
    },
    async getCode() {
      let sendBy = "BFSUMA_PWD";
      let phone = this.computedPhone;
      let result = await getTelCode({ sendBy, phone });
    },
    submitHandle() {
      const { country, phone, code, prePassword, password } = this.formParams;
      if (!country) {
        this.$refs.countryEmpty.style.display = "block";
        this.showHelpBlock = true;
      }
      if (!this.computedPhone) {
        this.showHelpBlock1 = true;
        this.$refs.phoneEmpty.style.display = "block";
      }
      if (!code.trim()) {
        this.showHelpBlock3 = true;
        this.$refs.codeNotEmpty.style.display = "block";
      }
      if (!prePassword.trim()) {
        this.showHelpBlock4 = true;
        this.$refs.characterErr.style.display = "block";
        this.$refs.letterErr.style.display = "block";
        this.$refs.numberErr.style.display = "block";
      }
      if (!password.trim()) {
        this.showHelpBlock5 = true;
        this.$refs.confirmErr.style.display = "block";
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus">
#find-cont
  .welcome
    color #5BA2CC
    font-size 36px
    margin 20px
  .find-main
    display flex
    padding-bottom 60px
    .find-banner
      flex 0.4
      max-width 50%
      padding 150px 30px
      img
        max-width 100%
    .find-form
      flex 0.6
      margin 0 0 0 120px
      border-top 4px solid #529ECB
      .form
        padding 40px
        background-color #fff
        .form-title
          font-size 18px
          margin 0 0 30px -20px
        .form-wrap-box
          display flex
          @media (max-width: 980px)
            display block
            margin 0
          .form-item
            flex 1
            &.margin-l
              margin-left 20px
              @media (max-width: 980px)
                margin-left 0
            @media (max-width: 980px)
              margin 12px 0
              background-color #fff
              flex-direction column
            .form-item-top
              display flex
              height 40px
              line-height 40px
              background-color #E6F0F3
              @media (max-width: 980px)
                display flex
                flex-direction column
              .item-lable
                color #4295C5
                font-weight bold
                height 20px
                line-height 20px
                margin 10px 0 10px 20px
                padding-right 10px
                border-right 1px solid #BABABA
                @media (max-width: 980px)
                  margin-left 0
                  border-right none
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
                .btn-getcode
                  padding 0 26px
                  height 100%
                  border-radius 4px
                  // border-left 40px solid
                  color #fff
                  background-color #959494
                  &:disabled
                    cursor not-allowed
                    opacity 0.65
                span
                  margin-left 15px
                .item-main-inner
                  flex 1
                  height 100%
                  color rgb(183, 183, 183)
                  padding-left 10px
                  border-radius 4px
                  // border-right 40px solid #fff
                  &::placeholder
                    color rgb(183, 183, 183)
                  &.show-help
                    box-shadow rgb(255, 174, 174) 0px 0px 0px 100px inset
                    &::placeholder
                      color #fff
                  option
                    color #575757
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
                display none
                color #a94442
                font-weight normal
                @media (max-width: 980px)
                  display none
                  margin-top 4px
        .error-item
          p
            display flex
            line-height 26px
            color #B7B7B7
            >i
              font-weight bold
              display none
              &:first-child
                color red
              &:last-child
                color #95C884
        .form-btns
          display flex
          justify-content space-around
          margin-top 14px
          .btn
            width 30%
            border-radius 4px
            font-size 15px
            height 50px
            line-height 50px
            margin-top 12px
          .btn-cancel
            color #fff
            background-color #959494
            filter grayscale(1)
          .btn-submit
            background #5ba2cc
            color #fff
            &:hover
              background #286090
            &:disabled
              filter grayscale(1)
</style>
