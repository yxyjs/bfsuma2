<template>
  <div class="personal-cont">
    <my-header />
    <my-step>
      <img src="../../static/img/personal_information.png" alt />
    </my-step>
    <form action="/" class="form" @submit.prevent="submitHandle">
      <my-required>Step two, please fill in your personal information：</my-required>
      <!-- form -->
      <div class="form-items">
        <div class="form-item">
          <label class="item-lable">*Name</label>
          <div class="item-inputs">
            <div class="item-inputs-wrap">
              <input
                type="text"
                placeholder="First Name"
                v-model="formParams.firstName"
                autofocus
                :class="showHelpBlock ? 'show-help' : ''"
              />
              <small class="help-block" v-show="showHelpBlock">Required</small>
            </div>
            <div class="item-inputs-wrap">
              <input
                class="last-name"
                type="text"
                placeholder="Last Name"
                v-model="formParams.lastName"
                :class="showHelpBlock1 ? 'show-help' : ''"
              />
              <small class="help-block" v-show="showHelpBlock1">Required</small>
            </div>
          </div>
        </div>
        <div class="form-item">
          <label class="item-lable">Gender</label>
          <select class="item-select" name="gender" id="gender" v-model="formParams.gender">
            <option disabled value style="display:none;">Fill in the city</option>
            <option
              :value="gender.text"
              v-for="(gender,index) in genderList"
              :key="index"
            >{{gender.value}}</option>
          </select>
        </div>
      </div>
      <div class="form-items">
        <div class="form-item">
          <label class="item-lable">*Email</label>
          <div class="item-inputs-wrap">
            <input
              type="text"
              placeholder="Email Address"
              v-model.lazy="formParams.email"
              :class="showHelpBlock2 ? 'show-help' : ''"
            />
            <small ref="showHelpBlock2" class="help-block" v-show="showHelpBlock2">Required</small>
          </div>
        </div>
        <div class="form-item">
          <label class="item-lable">*Phone</label>
          <div class="item-inputs">
            <select
              class="item-select"
              name="phoneHead"
              id="phoneHead"
              v-model="phoneHead"
              style="width:50%"
            >
              <!-- <option
                :value="phoneHead.text"
                v-for="(phoneHead,index) in phoneHeadList"
                :key="index"
              >{{phoneHead.value}}</option>-->
              <option style="display: none;" value="254">Aera Cod</option>
              <option value="254">254</option>
              <option value="234">234</option>
              <option value="255">255</option>
              <option value="256">256</option>
              <option value="264">264</option>
              <option value="233">233</option>
              <option value="237">237</option>
              <option value="229">229</option>
            </select>
            <div class="item-inputs-wrap">
              <input
                type="number"
                placeholder="Phone Number"
                v-model="phoneBody"
                maxlength="9"
                oninput="if(value.length>9)value=value.slice(0,9)"
                :class="showHelpBlock3 ? 'show-help' : ''"
              />
              <small ref="showHelpBlock3" class="help-block" v-show="showHelpBlock3">Required</small>
            </div>
          </div>
        </div>
      </div>
      <div class="form-items">
        <div class="form-item">
          <label class="item-lable">*Input Password</label>
          <div class="item-inputs">
            <input
              :type="!showPassword? 'password':'text'"
              placeholder="8~15 character,at least one letter and one number"
              v-model="formParams.password"
              maxlength="15"
            />
            <i
              class="item-icon iconfont icon-yanjing"
              v-show="isSee"
              @click="showPassword = !showPassword"
            ></i>
          </div>
        </div>
        <div class="form-item">
          <label class="item-lable">*Confirm Password</label>
          <div class="item-inputs">
            <input
              :type="!showConfirmPassword? 'password':'text'"
              placeholder="Reenter Password"
              v-model="confirmPassword"
              maxlength="15"
            />
            <i
              class="item-icon iconfont icon-yanjing"
              v-show="isSeeConfirm"
              @click="showConfirmPassword = !showConfirmPassword"
            ></i>
          </div>
        </div>
      </div>
      <!-- 密码验证提示 -->
      <div class="error-wrap">
        <div class="error-item" v-show="formParams.password">
          <div v-for="(error,index) in errorList" :key="index">
            <i class="iconfont icon-del-" style="color:red;font-weight:bold"></i>
            <span>{{error}}</span>
          </div>
        </div>
        <div class="error-item">
          <div class="error-item-wrap" v-show="formParams.password && confirmPassword && !isEqual">
            <i class="iconfont icon-del-" style="color:red;font-weight:bold"></i>
            <span>Passwords must match</span>
          </div>
          <div class="error-item-wrap" v-show="isEqual">
            <i class="iconfont icon-duigou" style="color:#95C884;font-weight:bold"></i>
            <span>Passwords must match</span>
          </div>
        </div>
      </div>
      <p class="country_tips">Which products are you interested in？</p>
      <div class="product-interest">
        <div class="checkbox-wrap" v-for="(interest,index) in productInterestList" :key="index">
          <input
            class="check-input"
            type="checkbox"
            name="product-interest"
            :id="interest.value"
            :value="interest.value"
            v-model="formParams.productInterests"
          />
          <img class="checked-img" src="../../static/img/checked.png" alt />
          <label :for="interest.value" class="check-box">
            <img class="check-box-img" src="../../static/img/check_box.png" alt />
          </label>
          <label :for="interest.value">{{interest.value}}</label>
        </div>
      </div>
      <p class="country_tips">Where did you learn about BF Suma？</p>
      <div class="product-interest">
        <div class="checkbox-wrap" v-for="(learn,index) in learnBfList" :key="index">
          <input
            class="check-input"
            type="radio"
            name="product-learn"
            :id="learn.value"
            :value="learn.value"
            v-model="formParams.source"
          />
          <img class="checked-img" src="../../static/img/checked.png" alt />
          <label class="check-label" :for="learn.value">{{learn.value}}</label>
        </div>
      </div>
      <div class="country_tips">
        By submitting your information, you agree to
        <a
          class="link"
          href="http://www.bfsuma.com/dt/register/agreement.html"
        >the BF Suma Privacy Policy</a>
      </div>
      <!-- btn -->
      <div class="btn-wrap">
        <button class="btn btn-back" type="button" @click="$router.push('/CountrySponsor')">Back</button>
        <button
          class="btn btn-submit"
          type="submit"
          @click.prevent="submitHandle"
          formnovalidate
        >Submit</button>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
import myHeader from "@/components/my-header";
import myRequired from "@/components/my-required";
import myStep from "@/components/my-step";
import { registerCheck, registerCustomer } from "../api/index";
export default {
  data() {
    return {
      showPassword: true,
      showConfirmPassword: true,
      showHelpBlock: false,
      showHelpBlock1: false,
      showHelpBlock2: false,
      showHelpBlock3: false,
      formParams: {
        firstName: "aa",
        lastName: "bb",
        gender: "",
        email: "1@q.com",
        phone: "",
        password: "",
        productInterests: [],
        source: "",
        sponsor: "",
        upline: "",
        country: "",
        city: ""
      },
      phoneHead: "",
      phoneBody: "123456789",
      confirmPassword: "",
      errorList: [],
      genderList: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" }
      ],
      phoneHeadList: [
        { text: 254, value: "254" },
        { text: 255, value: "255" },
        { text: 256, value: "256" }
      ],
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
    isEqual() {
      if (this.confirmPassword.trim()) {
        return this.formParams.password.trim() === this.confirmPassword.trim();
      }
    },
    isSee() {
      return this.formParams.password.trim();
    },
    isSeeConfirm() {
      return this.confirmPassword.trim();
    },
    computedPhone() {
      return "+" + this.phoneHead + this.phoneBody;
    }
  },
  watch: {
    phoneBody() {
      if (!this.phoneBody.trim()) {
        this.showHelpBlock3 = true;
      } else {
        this.showHelpBlock3 = true;

        if (this.phoneBody.trim().length < 9) {
          this.$refs.showHelpBlock3.innerHTML = "Format error";
        } else {
          this.showHelpBlock3 = false;
        }
      }
    },
    // 深度监听
    formParams: {
      handler: function() {
        const { firstName, lastName, email, phone, password } = this.formParams;
        // firstName
        if (!firstName.trim()) {
          this.showHelpBlock = true;
        } else {
          this.showHelpBlock = false;
        }
        // lastName
        if (!lastName.trim()) {
          this.showHelpBlock1 = true;
        } else {
          this.showHelpBlock1 = false;
        }
        // email
        if (!email.trim()) {
          this.showHelpBlock2 = true;
          //
        } else {
          this.showHelpBlock2 = true;
          const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (!reg.test(email.trim())) {
            this.$refs.showHelpBlock2.innerHTML = "Format error";
          } else {
            this.showHelpBlock2 = false;
          }
        }
        // password
        const errorList = [
          "8~15 character",
          "At least one letter",
          "At least one number"
        ];
        let tempList = []
        // 长度检测
        if (!/^[a-zA-Z0-9]{8,15}$/.test(password)) {
          tempList.push(errorList[0])
        }
        // 字母检测
        if (!/[a-zA-Z]/.test(password)) {
          tempList.push(errorList[1])
        }
        // 数字检测
        if (!/[0-9]/.test(password)) {
          tempList.push(errorList[2])
        }
        this.errorList = tempList;
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    async submitHandle() {
      const { firstName, lastName, email } = this.formParams;
      // 非空验证
      if (!firstName.trim()) {
        this.showHelpBlock = true;
        this.showHelpBlock1 = true;
        this.showHelpBlock2 = true;
        this.showHelpBlock3 = true;
      } else if (!lastName.trim()) {
        this.showHelpBlock1 = true;
        this.showHelpBlock2 = true;
        this.showHelpBlock3 = true;
      } else if (!email.trim()) {
        this.showHelpBlock2 = true;
        this.showHelpBlock3 = true;
      } else if (!this.phoneBody.trim()) {
        this.showHelpBlock3 = true;
      } else {
        // 验证密码是否匹配
        if (!this.isEqual) {
          return;
        } else {
          const ERRCODE = 102;
          // 验证邮箱或手机是否被注册过
          let res = await registerCheck(email, this.computedPhone);
          console.log(res);
          if (res.code === ERRCODE) {
            this.showHelpBlock2 = true;
            this.$refs.showHelpBlock2.innerHTML =
              "Already bound, please replace one";
          }
          // 提交表单注册
          this.formParams.phone = this.computedPhone;
          var formData = JSON.stringify(Object.assign(this.formParams));
          console.log(JSON.parse(formData));
          // let res2 = await registerCustomer()
        }
      }
    }
  },
  components: {
    "my-header": myHeader,
    "my-required": myRequired,
    "my-step": myStep
  }
};
</script>

<style scoped lang="stylus">
@import '../../static/stylus/pc'

.personal-cont
  .form
    margin-top 20px
    background-color #fff
    padding 20px
    @media (max-width: 980px)
      padding 8px
      margin-top 0
      min-height 100vh
    .form-items
      display flex
      margin 0 8px
      @media (max-width: 980px)
        display block
        margin 0
      .form-item
        flex 1
        display flex
        position relative
        margin 12px 20px 12px 0
        background-color #E6F0F3
        @media (max-width: 980px)
          margin 12px 0
          // padding 8px 0
          background-color #fff
          flex-direction column
        input
          width 100%
          padding 12px 0
          box-shadow none
          &.show-help
            box-shadow rgb(255, 174, 174) 0px 0px 0px 100px inset
            &::placeholder
              color #fff
          @media (max-width: 980px)
            background-color #E6F0F3
        .item-lable
          font-weight bold
          border-right 1px solid #BABABA
          color #4295C5
          margin-left 20px
          @media (max-width: 980px)
            margin-left 0px
            margin-bottom 4px
            border-right none
          &.input
            line-height 50px
        .item-inputs-wrap
          flex 1
          position relative
          .help-block
            position absolute
            left 0
            margin-top 40px
            color #a94442
            font-weight normal
            @media (max-width: 980px)
              display none
              margin-top 4px
        .item-inputs
          display flex
          flex 1
          .item-icon
            line-height 40px
            color #ccc
            background-color #E6F0F3
          .item-inputs-wrap
            position relative
            .help-block
              position absolute
              left 0
              margin-top 40px
              color #a94442
              font-weight normal
              @media (max-width: 980px)
                display none
            &:last-child
              border-left 15px solid #fff
        .item-select
          width 100%
          color rgb(87, 87, 87)
          padding-left 10px
          @media (max-width: 980px)
            line-height 36px
            background-color #E6F0F3
            border-radius 4px
          .item-select-option
            background-color #E6F0F3
          &.input
            height 50px
            text-indent 20px
    .error-wrap
      position relative
      color #B7B7B7
      margin-top 0
      .error-item
        position absolute
        left 50%
        margin-left -200px
        &:last-child
          left 100%
    .country_tips
      margin-top 20px
      font-weight bold
      .link
        color #5BA2CC
        &:hover
          color #23527c
    .product-interest
      margin 20px 30px
      @media (max-width: 980px)
        margin 10px 0 10px 20px
        line-height 2.6
        font-size 13px
      .checkbox-wrap
        position relative
        display inline-block
        width 33.33%
        @media (max-width: 980px)
          margin-right 40px
          line-height 24px
        .check-input
          display none
          &:checked+img.checked-img
            opacity 1
        label
          border-right none
          font-weight normal
          color #575757
          cursor pointer
          border-right none
        .check-box
          position absolute
          top 3px
          left -20px
          @media (max-width: 980px)
            top 0
            left -14px
          .check-box-img
            width 12px
        .checked-img
          opacity 0
          position absolute
          top 50%
          transform translateY(-50%)
          width 18px
          @media (max-width: 980px)
            left -16px
        .check-label
          &::before
            content ''
            display inline-block
            margin 0 6px 0 -20px
            width 11px
            height 11px
            border-radius 50%
            border 1px solid
            @media (max-width: 980px)
              margin 0 2px 0 -14px
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
      background-color #c8c8c8
    .btn-submit
      margin-left 15px
      background-color #5BA2CC
</style>
