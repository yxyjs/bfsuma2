<template>
  <div id="find-cont">
    <p class="welcome">Find Password</p>
    <div class="find-main">
      <div class="find-banner">
        <img src="../../../static/img/login_banner.png" />
      </div>
      <div class="find-form">
        <ValidationObserver
          ref="observer"
          @submit.prevent="onSubmit"
          v-slot="{ invalid }"
          tag="form"
          class="form"
        >
          <p class="form-title">Find Password</p>
          <!-- *Country -->
          <div class="form-wrap-box">
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item"
            >
              <div class="form-item-top">
                <label class="item-lable">*Country</label>
                <div class="item-main">
                  <select
                    class="item-main-inner"
                    v-model="formParams.country"
                    @change="countryChange"
                  >
                    <option disabled value style="display:none;">Select Country</option>
                    <option
                      :value="country.name"
                      v-for="(country, index) in countryList"
                      :key="index"
                    >{{ country.name }}</option>
                  </select>
                </div>
              </div>
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <!-- Phone -->
          <div class="form-wrap-box">
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item"
            >
              <div class="form-item-top">
                <label class="item-lable">*Phone</label>
                <div class="item-main">
                  <select
                    class="item-main-inner"
                    name="phoneHead"
                    id="phoneHead"
                    v-model="formParams.phoneHead"
                    @change="phoneHeadChange"
                  >
                    <option disabled value style="display: none;">Aera Code</option>
                    <option
                      :value="areaCode"
                      v-for="(areaCode ,index) in areaCodeArr"
                      :key="index"
                    >{{areaCode}}</option>
                  </select>
                </div>
              </div>
              <div class="form-item-bottom">
                <span ref="phoneHeadError" class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <div class="form-item">
              <ValidationProvider
                name="Phone"
                rules="required"
                v-slot="{ errors }"
                tag="section"
                class="form-item margin-l"
              >
                <div class="form-item-top">
                  <label class="item-lable hidden-lable">&nbsp;</label>
                  <div class="item-main">
                    <input
                      ref="phoneBody"
                      class="item-main-inner"
                      type="number"
                      placeholder="Phone Number"
                      v-model.trim="formParams.phoneBody"
                      @input="phoneBodyInput"
                      onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                      @focus="phoneBodyFocus"
                    />
                  </div>
                </div>
                <div class="form-item-bottom">
                  <span class="help-block">{{ errors[0] }}</span>
                  <small ref="phoneFormatErr" class="other-help">Format Error</small>
                  <small ref="phoneNotValid" class="other-help">Please enter a valid number</small>
                </div>
              </ValidationProvider>
            </div>
          </div>
          <!-- code -->
          <div class="form-wrap-box">
            <ValidationProvider
              name="Code"
              rules="required|length:6"
              v-slot="{ errors }"
              tag="section"
              class="form-item"
            >
              <div class="form-item-top">
                <label class="item-lable">*Code</label>
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    type="number"
                    placeholder="Short Message Verification Code"
                    v-model.trim="formParams.code"
                    oninput="if(value.length>6)value=value.slice(0,6)"
                    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                    :readonly="codeReadonly"
                    :disabled="codeDisabled"
                  />
                  <button
                    ref="getCodeBtn"
                    type="button"
                    class="btn-getcode"
                    :disabled="codeBtnDisabled"
                    @click="getCode"
                  >Get Code</button>
                </div>
              </div>
              <div class="form-item-bottom">
                <span ref="code" class="help-block">{{ errors[0] }}</span>
                <small ref="codeFailed" class="other-help">Failed to send text message</small>
                <small ref="notRegistered" class="other-help">Cell phone number not registered</small>
                <small ref="codeError" class="other-help">Verification code error</small>
                <small ref="codePhoneError" class="other-help">Phone number format error</small>
                <small ref="noAuth" class="other-help">
                  No authentication code has been
                  acquired or has expired.Please reacquire it
                </small>
              </div>
            </ValidationProvider>
          </div>
          <!-- prePassword -->
          <div class="form-wrap-box">
            <ValidationProvider
              name="Password"
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item"
            >
              <div class="form-item-top">
                <label class="item-lable">*Password</label>
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    :type="!showPrePassword ? 'password' : 'text'"
                    placeholder="8~15 character,at least one letter and one number"
                    v-model.trim="prePassword"
                    oninput="if(value.length>15)value=value.slice(0,15)"
                  />
                  <i
                    class="item-icon iconfont icon-yanjing"
                    v-show="isSeePre"
                    @click="showPrePassword = !showPrePassword"
                  ></i>
                </div>
              </div>
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
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
            <ValidationProvider
              name="Confirm Password"
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item"
            >
              <div class="form-item-top">
                <label class="item-lable">*Confirm</label>
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    :type="!showPassword ? 'password' : 'text'"
                    placeholder="Reenter Password"
                    v-model.trim="formParams.password"
                    oninput="if(value.length>15)value=value.slice(0,15)"
                    @focus="confirmPasswordFocus"
                  />
                  <i
                    class="item-icon iconfont icon-yanjing"
                    v-show="isSeeConfirm"
                    @click="showPassword = !showPassword"
                  ></i>
                </div>
              </div>
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
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
            <button type="submit" class="btn btn-submit">Submit</button>
          </section>
        </ValidationObserver>
      </div>
    </div>
    <!-- toast -->
    <my-toast :toastText="toastText" :showToast="showToast" @closeToast="showToast=false"></my-toast>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  getTelCode,
  distributorResetpwd,
  getAllCountry,
  getAllCity
} from "@/api/index";
import { session } from "@/util/tool";
import myToast from "@/components/my-toast";
export default {
  data() {
    return {
      showPrePassword: false,
      showPassword: false,
      disabled: false,
      codeBtnDisabled: true,
      showToast: false,
      codeReadonly: true,
      codeDisabled: true,
      toastText: "",
      prePassword: "",
      formParams: {
        country: "",
        phone: "",
        code: "",
        password: "",
        phoneHead: "",
        phoneBody: ""
      },
      countryList: [],
      cityList: [],
      areaCodeArr: []
    };
  },
  computed: {
    isPasswordEqual() {
      const { password } = this.formParams;
      const { prePassword } = this;
      if (prePassword) {
        return prePassword === password;
      }
    },
    computedPhone() {
      const { phoneHead, phoneBody } = this.formParams;
      return phoneHead + phoneBody;
    },
    isSeePre() {
      const { prePassword } = this;
      return prePassword;
    },
    isSeeConfirm() {
      const { password } = this.formParams;
      return password;
    }
  },
  watch: {
    formParams: {
      handler(val) {
        let { code, password, country, phoneBody } = val;
        const { prePassword } = this;
        // let value = "";
        // if (country === "China") {
        //   if (phoneBody.length >= 11) {
        //     this.codeBtnDisabled = false;
        //     value = phoneBody.slice(0, 11);
        //     this.formParams.phoneBody = value;
        //   } else {
        //     this.codeBtnDisabled = true;
        //   }
        // } else {
        //   if (phoneBody.length >= 9) {
        //     this.codeBtnDisabled = false;
        //     value = phoneBody.slice(0, 9);
        //     this.formParams.phoneBody = value;
        //   } else {
        //     this.codeBtnDisabled = true;
        //   }
        // }

        // password
        if (!prePassword || !password) {
          return;
        } else {
          if (prePassword === password) {
            this.$refs.confirmErr.style.display = "none";
            this.$refs.confirmPass.style.display = "block";
          } else {
            this.$refs.confirmErr.style.display = "block";
            this.$refs.confirmPass.style.display = "none";
          }
        }
      },
      deep: true
    },
    prePassword(val) {
      // password
      // 长度检测
      if (/^[a-zA-Z0-9]{8,15}$/.test(val)) {
        this.$refs.characterPass.style.display = "block";
        this.$refs.characterErr.style.display = "none";
      } else {
        this.$refs.characterPass.style.display = "none";
        this.$refs.characterErr.style.display = "block";
      }
      // 字母检测
      if (/[a-zA-Z]/.test(val)) {
        this.$refs.letterPass.style.display = "block";
        this.$refs.letterErr.style.display = "none";
      } else {
        this.$refs.letterPass.style.display = "none";
        this.$refs.letterErr.style.display = "block";
      }
      // 数字检测
      if (/[0-9]/.test(val)) {
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
  },
  mounted() {
    let countryList = session.get("countryList");
    if (countryList) {
      this.countryList = countryList;
    } else {
      this.getAllCountry();
    }
  },
  methods: {
    phoneHeadChange() {
      if ((this.$refs.phoneHeadError.innerHTML = "Format Error")) {
        this.$refs.phoneHeadError.innerHTML = "";
      }
      this.formParams.phoneBody = "";
    },
    phoneBodyInput(event) {
      this.codeBtnDisabled = true;
      let value = event.target.value;
      let numberLength = 9;
      if (this.formParams.phoneHead === "234") {
        numberLength = 10;
      }
      if (value.length >= numberLength) {
        value = value.slice(0, numberLength);
        this.codeBtnDisabled = false;
      }
      this.formParams.phoneBody = value;
    },
    phoneBodyFocus() {
      if ((this.$refs.notRegistered.style.display = "block")) {
        this.$refs.notRegistered.style.display = "none";
      }
      if (this.codeBtnDisabled) {
        this.codeBtnDisabled = false;
      }
    },
    confirmPasswordFocus() {},
    countryChange(event) {
      this.formParams.phoneBody = "";
      let value = event.target.value;
      const countryList = this.countryList;
      for (let i = 0; i < countryList.length; i++) {
        const element = countryList[i];
        if (element.name === value) {
          this.formParams.phoneHead = element.areaCode;
          session.set("areaCode", element.areaCode);
        }
      }

      let { phoneHead } = this.formParams;
    },
    async getAllCountry() {
      let res = await getAllCountry();
      const rescode = res.code;
      if (rescode === 0) {
        const resdata = res.data;
        const areaCodeArr = resdata.map(v => v.areaCode);
        this.areaCodeArr = areaCodeArr;
        this.countryList = resdata;
      }
    },
    async getAllCity() {
      let res = await getAllCity();
    },
    async getCode() {
      if (!this.formParams.phoneHead) {
        this.$refs.phoneHeadError.innerHTML = "Format Error";
        return;
      }
      if (this.$refs.code.innerHTML === "Required") {
        this.$refs.code.innerHTML = "";
      }
      let sendBy = "BFSUMA_PWD";
      let phone = this.computedPhone;
      let res = await getTelCode({ sendBy, phone });

      if (res) {
        const rescode = res.code;
        if (rescode === 0) {
          this.codeReadonly = false;
          this.codeDisabled = false;
          // 按钮倒计时
          let time = 60;
          this.interval = setInterval(() => {
            this.codeBtnDisabled = true;
            time = time < 10 ? "0" + time : time;
            this.$refs.getCodeBtn.innerHTML = time + "s";
            time--;
            if (time === 0) {
              clearInterval(this.interval);
              this.codeBtnDisabled = false;
              this.$refs.getCodeBtn.innerHTML = "Get Code";
            }
          }, 1000);
        }
        if (rescode === 201) {
          this.codeBtnDisabled = true;
          this.codeDisabled = true;
          this.$refs.notRegistered.style.display = "block";
        }
      }
    },
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.showToast = true;
        this.toastText = "Please check required";
        return;
      }
      const { phone, password, code } = this.formParams;
      const reqData = {
        phone: phone,
        password: password,
        verifyCode: code,
        sendBy: "BFSUMA_PWD"
      };
      let res = await distributorResetpwd(reqData);
      if (res) {
        const rescode = res.code;
        if (rescode === 0) {
        }
        if (rescode === 201) {
          // 未获取验证码或者已过期，请重新获取
          this.$refs.codeError.style.display = "block";
          clearInterval(this.interval);
          this.codeBtnDisabled = false;
          this.$refs.getCodeBtn.innerHTML = "Get Code";
        }
        if (rescode === 202) {
          this.$refs.noAuth.style.display = "block";
        }
        if (rescode === 101 || rescode === 102) {
          this.showToast = true;
          this.toastText = "Failed to change password";
        }
      }
    }
  },
  components: {
    "my-toast": myToast
  }
};
</script>

<style scoped lang="stylus">
#find-cont
  .welcome
    color #5BA2CC
    font-size 36px
    margin 20px
    @media (max-width: 980px)
      display none
  .find-main
    display flex
    padding-bottom 60px
    @media (max-width: 980px)
      padding-bottom 20px
    .find-banner
      flex 0.4
      max-width 50%
      padding 150px 30px
      @media (max-width: 980px)
        display none
      img
        max-width 100%
    .find-form
      flex 0.6
      margin-left 120px
      border-top 4px solid #529ECB
      @media (max-width: 980px)
        flex 1
        margin-left 0
        border-top none
      .form
        padding 40px
        background-color #fff
        @media (max-width: 980px)
          padding 10px
        .form-title
          font-size 18px
          margin 0 0 30px -20px
          @media (max-width: 980px)
            display none
        .form-wrap-box
          display flex
          @media (max-width: 980px)
            display flex
            margin 0
          .form-item
            flex 1
            &.margin-l
              margin-left 16px
              @media (max-width: 980px)
                margin-left 0
                padding-left 10px
            @media (max-width: 980px)
              // margin 0 0 12px 0
              flex-direction column
            .form-item-top
              display flex
              height 40px
              line-height 40px
              background-color #E6F0F3
              @media (max-width: 980px)
                display flex
                flex-direction column
                background-color #fff
                height 22px
              .item-lable
                color #4295C5
                font-weight bold
                height 20px
                line-height 20px
                margin 10px 0 10px 20px
                padding-right 10px
                border-right 1px solid #BABABA
                @media (max-width: 980px)
                  margin 0
                  font-size 12px
                  border-right none
                  font-weight normal
                &.hidden-lable
                  display none
                  @media (max-width: 980px)
                    display block
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
                .btn-getcode
                  padding 0 26px
                  height 100%
                  border-radius 4px
                  color #fff
                  background-color #5ba1cd
                  @media (max-width: 980px)
                    height 36px
                    line-height 36px
                  &:disabled
                    cursor not-allowed
                    opacity 0.5
                    background-color #959494
                span
                  margin-left 15px
                .item-icon
                  background #e6f0f3
                .item-main-inner
                  flex 1
                  color #575757
                  padding-left 10px
                  @media (max-width: 980px)
                    padding 10px 0 10px 10px
                    background #e6f0f3
                  &::placeholder
                    color #b7b7b7
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
              @media (max-width: 980px)
                margin-top 32px
                height 14px
                line-height 14px
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
        .error-item
          @media (max-width: 980px)
            font-size 12px
          p
            display flex
            line-height 26px
            color #B7B7B7
            >i
              @media (max-width: 980px)
                font-size 14px
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
            @media (max-width: 980px)
              margin-top 32px
          .btn-cancel
            color #5ba2cc
            border 1px solid #5ba2cc
            &:hover
              background #eee
          .btn-submit
            background #5ba2cc
            color #fff
            &:hover
              background #286090
              @media (max-width: 980px)
                background #5ba2cc
            &:disabled
              filter grayscale(1)
</style>
