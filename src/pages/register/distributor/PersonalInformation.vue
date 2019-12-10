<template>
  <div id="personal-cont">
    <SumaHeader path="personalInformation"></SumaHeader>
    <my-header>
      <a href="javascript:;" @click="$router.replace('/register')">Register</a>
      <span>/ Distributor Register</span>
    </my-header>
    <my-step>
      <img src="../../../../static/img/personal_information.png" alt />
    </my-step>
    <ValidationObserver
      ref="observer"
      @submit.prevent="onSubmit"
      v-slot="{ invalid }"
      tag="form"
      class="form"
    >
      <p class="top-tips">Step two, please fill in your personal information：</p>
      <p class="required">*Required</p>
      <!-- form -->
      <div class="form-wrap">
        <section>
          <!-- Name -->
          <div class="form-wrap-box">
            <ValidationProvider
              name="First Name"
              rules="required|alpha_spaces"
              v-slot="{ errors }"
              tag="section"
              class="form-item"
            >
              <div class="form-item-top">
                <label class="item-lable">*Name</label>
                <div class="item-main">
                  <input
                    type="text"
                    class="item-main-inner"
                    placeholder="First Name"
                    v-model.trim="formParams.firstName"
                    autofocus
                  />
                </div>
              </div>
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="Last Name"
              rules="required|alpha_spaces"
              v-slot="{ errors }"
              tag="section"
              class="form-item margin-l"
            >
              <div class="form-item-top">
                <label class="item-lable hidden-lable">&nbsp;</label>
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    type="text"
                    placeholder="Last Name"
                    v-model.trim="formParams.lastName"
                  />
                </div>
              </div>
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <!-- Gender -->
          <div class="form-wrap-box">
            <section class="form-item">
              <div class="form-item-top">
                <label class="item-lable">Gender</label>
                <div class="item-main">
                  <select
                    class="item-main-inner"
                    name="gender"
                    id="gender"
                    v-model="formParams.gender"
                  >
                    <option disabled value style="display:none;">Select gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
        </section>
        <section class="section-two">
          <!-- Email -->
          <div class="form-wrap-box">
            <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
              tag="section"
              class="form-item"
            >
              <div class="form-item-top">
                <label class="item-lable">*Email</label>
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    type="text"
                    placeholder="Email Address"
                    v-model.lazy="formParams.email"
                    @focus="emailFocus"
                  />
                </div>
              </div>
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
                <span ref="emailBound" class="already-bound">Already bound, please replace one</span>
              </div>
            </ValidationProvider>
          </div>
          <!-- Phone -->
          <div class="form-wrap-box">
            <ValidationProvider
              name="Phone"
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
                    v-model="phoneHead"
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
                <span class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="Phone Number"
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item margin-l"
            >
              <div class="form-item-top">
                <label class="item-lable hidden-lable">&nbsp;</label>
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    type="number"
                    placeholder="Phone Number"
                    v-model.trim="phoneBody"
                    @input="phoneBodyInput"
                    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                    @focus="phoneBodyFocus"
                  />
                </div>
              </div>
              <div class="form-item-bottom">
                <span ref="phoneBodyError" class="help-block">{{ errors[0] }}</span>
                <span ref="phoneBound" class="already-bound">Already bound, please replace one</span>
              </div>
            </ValidationProvider>
          </div>
        </section>
        <section>
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
                <label class="item-lable">*Input Password</label>
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
          <!-- password -->
          <div class="form-wrap-box">
            <ValidationProvider
              name="Confirm Password"
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item"
            >
              <div class="form-item-top">
                <label class="item-lable">*Confirm Password</label>
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    :type="!showPassword ? 'password' : 'text'"
                    placeholder="Reenter Password"
                    v-model.trim="formParams.password"
                    oninput="if(value.length>15)value=value.slice(0,15)"
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
        </section>
      </div>
      <!-- 密码验证提示 -->
      <div class="error-wrap">
        <div class="error-item" v-show="prePassword">
          <div v-for="(error, index) in passwordErrorList" :key="index">
            <i class="iconfont icon-del-" style="color:red;font-weight:bold"></i>
            <span>{{ error }}</span>
          </div>
        </div>
        <div class="error-item" ref>
          <div
            class="error-item-wrap"
            v-show="prePassword && formParams.password && !isPasswordEqual"
          >
            <i class="iconfont icon-del-" style="color:red;font-weight:bold"></i>
            <span>Passwords must match</span>
          </div>
          <div class="error-item-wrap" v-show="isPasswordEqual">
            <i class="iconfont icon-duigou" style="color:#95C884;font-weight:bold"></i>
            <span>Passwords must match</span>
          </div>
        </div>
      </div>
      <p class="country-tips">Which products are you interested in？</p>
      <div class="product-interest">
        <div class="checkbox-wrap" v-for="(interest, index) in productInterestList" :key="index">
          <input
            class="check-input"
            type="checkbox"
            name="product-interest"
            :id="interest.value"
            :value="interest.value"
            v-model="formParams.productInterests"
          />
          <img class="check-img" src="../../../../static/img/checked.png" alt />
          <label :for="interest.value" class="interest-label-box">
            <img class="check-box-img" src="../../../../static/img/check_box.png" alt />
          </label>
          <label class="check-label" :for="interest.value">
            {{
            interest.value
            }}
          </label>
        </div>
      </div>
      <p class="country-tips">Where did you learn about BF Suma？</p>
      <div class="product-interest">
        <div class="checkbox-wrap" v-for="(learn, index) in learnBfList" :key="index">
          <input
            class="check-input"
            type="radio"
            name="product-learn"
            :id="learn.value"
            :value="learn.value"
            v-model="formParams.source"
          />
          <img class="check-img" src="../../../../static/img/checked.png" alt />
          <label :for="learn.value" class="interest-label-box">
            <i class="check-box-img iconfont icon-radio"></i>
          </label>
          <label class="check-label" :for="learn.value">
            {{
            learn.value
            }}
          </label>
        </div>
      </div>
      <div class="country-tips">
        By submitting your information, you agree to
        <a
          class="link"
          href="javascript:;"
          @click="agreeHandle"
        >the BF Suma Privacy Policy</a>
      </div>
      <div class="btn-wrap">
        <button class="btn btn-back" type="button" @click="goBack">Back</button>
        <button class="btn btn-submit" type="submit">Submit</button>
      </div>
    </ValidationObserver>
    <my-toast :toastText="toastText" :showToast="showToast" @closeToast="showToast=false"></my-toast>
    <mobile-loading :showMobileLoading="showMobileLoading" />
    <my-dialog
      title="Create account"
      :showDialog="showDialog"
      @dialogHandle="dialogHandle"
    >
      <div
        slot="dialog-text"
        class="dialog-text"
      >Account created, you can now log in with your mobile number or E-mail.</div>
    </my-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  BASE_URL,
  registerCheck,
  registerCustomer,
  distributorLogin
} from "@/api/index";
import { session } from "@/util/tool";
import SumaHeader from "@/components/SumaHeader";
import myHeader from "@/components/my-header";
import myStep from "@/components/my-step";
import myToast from "@/components/my-toast";
import myDialog from "@/components/my-dialog";
import mobileLoading from "@/components/mobile-loading";
export default {
  data() {
    return {
      rules: "",
      BASE_URL: BASE_URL,
      showPrePassword: false,
      showPassword: false,
      showToast: false,
      showDialog: false,
      showDialog1: false,
      showMobileLoading: false,
      toastText: "",
      prePassword: "", //初始密码
      phoneHead: "",
      phoneBody: "",
      count: 0, //表单修改次数
      formParams: {
        //表单对象
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phone: "",
        password: "",
        productInterests: [],
        source: "",
        country: "",
        city: "",
        sponsor: "",
        upline: ""
      },
      areaCodeArr: [],
      passwordErrorList: [], //密码错误提示
      productInterestList: [
        {
          id: 0,
          value: "Bone& Joint Care"
        },
        {
          id: 1,
          value: "Cardiovascular Health"
        },
        {
          id: 2,
          value: "Digestive Health"
        },
        {
          id: 3,
          value: "Immune Booster"
        },
        {
          id: 4,
          value: "Men’s Health"
        },
        {
          id: 5,
          value: "Muti-Vitamins"
        },
        {
          id: 6,
          value: "Slim&Beauty"
        },
        {
          id: 7,
          value: "Suma Baby"
        },
        {
          id: 8,
          value: "Suma Living"
        }
      ],
      learnBfList: [
        {
          id: 0,
          value: "Social media"
        },
        {
          id: 1,
          value: "Radio"
        },
        {
          id: 2,
          value: "Newspaper"
        },
        {
          id: 3,
          value: "TV"
        },
        {
          id: 4,
          value: "Advertising billboard"
        },
        {
          id: 5,
          value: "Friend’s recommendation"
        }
      ]
    };
  },
  computed: {
    // 密码是否相等
    isPasswordEqual() {
      if (this.prePassword) {
        return this.prePassword === this.formParams.password;
      }
    },
    isSeePre() {
      return this.prePassword;
    },
    isSeeConfirm() {
      return this.formParams.password;
    },
    computedPhone() {
      return this.phoneHead + this.phoneBody;
    }
  },
  watch: {
    prePassword(val) {
      const passwordErrorList = [
        "8~15 character",
        "At least one letter",
        "At least one number"
      ];
      let tempList = [];
      // 长度检测
      if (!/^[a-zA-Z0-9]{8,15}$/.test(val)) {
        tempList.push(passwordErrorList[0]);
      }
      // 字母检测
      if (!/[a-zA-Z]/.test(val)) {
        tempList.push(passwordErrorList[1]);
      }
      // 数字检测
      if (!/[0-9]/.test(val)) {
        tempList.push(passwordErrorList[2]);
      }
      this.passwordErrorList = tempList;
    }
    // phoneHead(val) {
    //   this.rules = val === "234" ? "required|length:10" : "required|length:9";
    // }
  },
  mounted() {
    const areaCodeArr = session.get("areaCodeArr");
    if (areaCodeArr) {
      this.areaCodeArr = areaCodeArr;
    }

    const registerInfo = session.get("registerInfo");
    if (registerInfo) {
      this.formParams = registerInfo;
      this.prePassword = registerInfo.prePassword;
      this.phoneBody = registerInfo.phoneBody;
    }

    const areaCode = session.get("areaCode");
    if (areaCode) {
      this.phoneHead = areaCode;
    }

    const distSponsor = session.get("distSponsor");
    this.formParams.country = distSponsor.country;
    this.formParams.city = distSponsor.city;
    const uplineId = session.get("uplineId");

    this.formParams.upline = uplineId;
    const distributorId = session.get("distributorId");
    this.formParams.sponsor = distributorId;
  },
  methods: {
    phoneHeadChange() {
      this.phoneBody = "";
      this.$refs.phoneBodyError.innerHTML = "";
    },
    phoneBodyInput(event) {
      let value = event.target.value;
      if (!/^\d+$/.test(value)) return;
      let numberLength;
      let phoneHead = this.phoneHead;
      const nineList = ["254", "255", "256", "264", "233", "237", "229"];
      if (nineList.includes(phoneHead)) {
        numberLength = 9;
      }
      if (phoneHead === "234") {
        numberLength = 10;
      }
      if (value.length >= numberLength) {
        this.$refs.phoneBodyError.innerHTML = "";
        value = value.slice(0, numberLength);
      } else {
        const arr = nineList;
        arr.push("234");
        if (!arr.includes(phoneHead)) {
          this.$refs.phoneBodyError.innerHTML = "";
        } else {
          this.$refs.phoneBodyError.innerHTML = "Format Error";
        }
      }
      this.phoneBody = value;
    },
    emailFocus() {
      if (this.$refs.emailBound.style.display === "block")
        this.$refs.emailBound.style.display = "none ";
    },
    phoneBodyFocus() {
      if (this.$refs.phoneBound.style.display === "block")
        this.$refs.phoneBound.style.display = "none ";
    },
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.showToast = true;
        this.toastText = "Please check required";
        return;
      }
      if (!this.isPasswordEqual) {
        this.showToast = true;
        this.toastText = "Passwords must match";
        return;
      } else {
        session.remove("registerInfo");
        this.registerCheck();
      }
    },
    // 验证邮箱或手机是否被注册过
    async registerCheck() {
      let res = await registerCheck(this.formParams.email, this.computedPhone);
      const errcode = res.code;
      switch (errcode) {
        case 0:
          this.registerCustomer();
          break;
        case 101: //邮箱和手机被使用了
          this.$refs.phoneBound.style.display = "block";
          this.$refs.emailBound.style.display = "block";
          this.showToast = true;
          this.toastText = "Please check email or phone";
          break;
        case 102: //邮箱被使用了
          this.$refs.emailBound.style.display = "block";
          this.showToast = true;
          this.toastText = "Please check email";
          break;
        case 103: //手机号码被使用了
          this.$refs.phoneBound.style.display = "block";
          this.showToast = true;
          this.toastText = "Please check phone";
          break;
        default:
          break;
      }
    },
    // 注册顾客
    async registerCustomer() {
      this.showMobileLoading = true;
      let { country, city, sponsor, upline } = this.formParams;
      const reqData = Object.assign({}, this.formParams);
      reqData.phone = this.computedPhone;
      reqData.productInterests = JSON.stringify(reqData.productInterests);
      const sponsorData = session.get("sponsorData");
      const uplineData = session.get("uplineData");
      const distObj = Object.assign({}, reqData);
      distObj.sponsor = sponsorData;
      distObj.upline = uplineData;
      session.set("distInformation", distObj);
      const res = await registerCustomer(reqData);
      this.showMobileLoading = false;
      const rescode = res.code;
      switch (rescode) {
        case 0:
          this.distributorLogin();
          this.showDialog = true;
          const resdata = res.data;
          session.set("customerInfo", resdata);
          break;
        case 101:
          break;
        default:
          break;
      }
    },
    // 注册完成自动登录
    async distributorLogin() {
      const { email, password } = this.formParams;
      const reqData = {};
      reqData.account = email;
      reqData.password = password;
      reqData.rememberPwd = false;
      let res = await distributorLogin(reqData);
      const rescode = res.code;
      // this.disabled = true;
      if (rescode === 0) {
        let userInfo = {
          account: email,
          password: password
        };
        const resdata = res.data;
        // 成功
        session.set("user", resdata);
      }
    },
    dialogHandle(flag) {
      if (flag) {
        this.$router.replace("/register/distributor/payment");
      }
    },
    rememberInput() {
      const registerInfo = JSON.parse(JSON.stringify(this.formParams));
      registerInfo.prePassword = this.prePassword;
      registerInfo.phoneBody = this.phoneBody;
      session.set("registerInfo", registerInfo);
    },
    agreeHandle() {
      this.rememberInput();
      this.$router.push("/register/agreement");
    },
    goBack() {
      this.rememberInput();
      this.$router.go(-1);
    }
  },
  components: {
    "my-header": myHeader,
    "my-step": myStep,
    "my-toast": myToast,
    "my-dialog": myDialog,
    "mobile-loading": mobileLoading,
    SumaHeader
  }
};
</script>

<style scoped lang="stylus">
@import '../../../../static/stylus/common.styl'

select, input
  padding-left 10px
#personal-cont
  margin-top 132px
  @media (max-width: 980px)
    margin-top 50px
  .form
    margin 20px 0 38px 0
    background-color #fff
    padding 20px
    @media (max-width: 980px)
      padding 8px
      margin-top 0
      min-height 100vh
    .top-tips
      font-size 14px
      font-weight bold
      color #575757
      line-height 30px
      @media (max-width: 980px)
        font-size 13px
        line-height 1.5
        font-weight normal
    .required
      margin 12px 0 0 0
      color #5BA2CC
      @media (max-width: 980px)
        margin 0
    .form-wrap
      margin-top 20px
      overflow hidden
      @media (max-width: 980px)
        margin-top 0px
      >section
        display flex
        @media (max-width: 980px)
          display block
          &.section-two
            margin-top 30px
        .form-wrap-box
          display flex
          flex 1
          &:nth-child(2n)
            margin-left 40px
            @media (max-width: 980px)
              margin-left 0
          @media (max-width: 980px)
            display flex
            margin 0
          .form-item
            flex 1
            @media (max-width: 980px)
              background-color #fff
              flex-direction column
            &.margin-l
              margin-left 16px
              @media (max-width: 980px)
                margin-left 0
                padding-left 10px
            .form-item-top
              display flex
              background-color #E6F0F3
              height 35px
              @media (max-width: 980px)
                display block
                background-color #fff
              .item-lable
                font-weight bold
                border-right 1px solid #BABABA
                color #4295C5
                margin 10px 0 10px 20px
                padding-right 10px
                line-height 15px
                &.hidden-lable
                  display none
                  @media (max-width: 980px)
                    display block
                    margin 3px
                @media (max-width: 980px)
                  margin-left 0
                  border-right none
                  font-size 12px
                  font-weight normal
              .item-main
                flex 1
                display flex
                align-items center
                color rgb(87, 87, 87)
                @media (max-width: 980px)
                  background-color #E6F0F3
                &.nth-child(2)
                  margin-left 10px
                .item-main-inner
                  flex 1
                  height 100%
                  color rgb(87, 87, 87)
                  // padding 10px
                  @media (max-width: 980px)
                    padding 10px 0 10px 10px
                  &.show-help
                    box-shadow rgb(255, 174, 174) 0px 0px 0px 100px inset
                    &::placeholder
                      color #fff
                .item-icon
                  color #ccc
            .form-item-bottom
              display flex
              height 20px
              line-height 20px
              @media (max-width: 980px)
                margin-top 15px
              .help-block
                font-size 12px
                font-weight normal
                color #a94442
                @media (max-width: 980px)
                  margin-top 4px
              .already-bound
                font-size 12px
                color #a94442
                display none
    .error-wrap
      position relative
      color #B7B7B7
      margin-top 0
      @media (max-width: 980px)
        position static
        padding-bottom 40px
        font-size 12px
      .error-item
        position absolute
        left 50%
        margin-left -200px
        @media (max-width: 980px)
          left 56%
        &:last-child
          left 100%
        >div
          font-size 14px
          @media (max-width: 980px)
            font-size 12px
          >i
            font-size 16px
            @media (max-width: 980px)
              font-size 14px
    .country-tips
      margin-top 20px
      font-weight bold
      @media (max-width: 980px)
        margin-top 6px
      .link
        color #5BA2CC
        &:hover
          color #23527c
    .product-interest
      margin 20px 30px
      @media (max-width: 980px)
        margin 6px 0 6px 24px
        line-height 2.6
        font-size 12px
      .checkbox-wrap
        position relative
        display inline-block
        width 33.33%
        @media (max-width: 980px)
          margin-right 40px
          line-height 18px
        .check-input
          display none
          &:checked+img.check-img
            opacity 1
        .interest-label-box
          position absolute
          top 14px
          cursor pointer
          @media (max-width: 980px)
            top 50%
            left -14px
            transform translateY(-10px)
          .check-box-img
            width 12px
          .icon-radio
            display block
            font-size 14px
            transform translateY(-4px)
            @media (max-width: 980px)
              transform translateY(0)
        .check-label
          display inline-block
          height 20px
          line-height 20px
          margin 10px 0 10px 20px
          font-weight normal
          color #575757
          cursor pointer
          border-right none
          @media (max-width: 980px)
            white-space nowrap
            margin 4px 0 4px 4px
        .check-img
          opacity 0
          position absolute
          top 50%
          transform translateY(-50%)
          width 18px
          @media (max-width: 980px)
            left -16px
  .btn-wrap
    margin-top 30px
    text-align right
    @media (max-width: 980px)
      display flex
      text-align center
    .btn
      color #fff
      width 100px
      height 50px
      border-radius 4px
      @media (max-width: 980px)
        flex 1
        font-size 16px
    .btn-back
      color #4295c5
      border 1px solid #4295c5
      &:hover
        background #eee
    .btn-submit
      margin-left 15px
      background-color #5BA2CC
      &:hover
        background #286090
</style>
