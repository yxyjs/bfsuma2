<template>
  <div id="payment-cont">
    <my-header />
    <my-step>
      <img src="../../static/img/payment.png" alt />
    </my-step>
    <div class="pay-mid">
      <p
        class="top-tips"
      >Step three, please pay a KES 1800 registration fee only by M-pesa and the welcome kits will be delievered for you.</p>
      <div class="pay-main">
        <section class="pay-info">
          <div class="img-wrap">
            <img src="../../static/img/payment_banner.png" alt />
          </div>
          <ul>
            <li>
              <span class="info-title">User:</span>
              <span class="info-content">{{email}}</span>
            </li>
            <li>
              <span class="info-title">Order:</span>
              <span class="info-content">{{formParams.orderNo}}</span>
            </li>
            <li>
              <span class="info-title">Amount:</span>
              <span class="info-content">KES {{formParams.amount}}</span>
            </li>
          </ul>
        </section>
        <section class="pay-account">
          <p>Please pay the EXACT amount to complete your order</p>
          <div class="pay-account-main">
            <p
              v-show="showPayError"
              class="pay-error"
            >Sorry,your phone hasn't been opened for M-pesa payment.</p>
            <form class="form">
              <div class="form-box">
                <div class="form-input">
                  <label class="form-input-label" for="payPhone">Your Phone</label>
                  <input
                    id="payPhone"
                    class="form-input-inner"
                    :class="showHelpBlock ? 'show-help' : ''"
                    type="number"
                    placeholder="Phone Number"
                    v-model="formParams.payPhone"
                    maxlength="12"
                    oninput="if(value.length>12)value=value.slice(0,12)"
                  />
                </div>
                <button
                  class="form-button"
                  type="submit"
                  @click="payHandle"
                  :disabled="disabled"
                >Pay</button>
              </div>
              <div class="form-bottom">
                <small ref="showHelpBlock" class="help-block" v-show="showHelpBlock">Required</small>
              </div>
            </form>
            <!-- loading -->
            <my-loading :show="showLoading"></my-loading>
            <ul>
              <li>
                <span class="info-title">Account:</span>
                <span class="info-content">SUMA HEALTH PRODUCTS CO.LTD</span>
              </li>
              <li>
                <span class="info-title">Amount:</span>
                <span class="info-content">KES{{rightAmount}}.00</span>
              </li>
            </ul>
          </div>
          <button class="form-button" type="button" @click="$router.push('/Personal')">Skip</button>
        </section>
      </div>
    </div>
    <!-- 填写收货地址弹窗 -->
    <my-dialog
      title="Shipping Address"
      :showDialog="showDialog"
      @dialogHandle="dialogHandle"
      @closeDialog="showDialog=false"
      showCancel
    >
      <div slot="dialog-text">
        You have successfully registered and you are now a BF Suma
        distributor.
        Please write the address where you will want your welcome kit delivered or send. Thank you
      </div>
      <div slot="dialog-table">
        <div class="form-wrap-box">
          <section class="form-item">
            <div class="form-item-top">
              <label class="item-lable">*Name</label>
              <div class="item-main">
                <input
                  type="text"
                  class="item-main-inner"
                  placeholder="First Name"
                  v-model="formParams.firstName"
                  autofocus
                  :class="showHelpBlock ? 'show-help' : ''"
                />
              </div>
            </div>
            <div class="form-item-bottom">
              <small ref="showHelpBlock" class="help-block" v-show="showHelpBlock">Required</small>
            </div>
          </section>
          <section class="form-item" style="margin-left:16px">
            <div class="form-item-top">
              <div class="item-main">
                <input
                  class="item-main-inner"
                  type="text"
                  placeholder="Last Name"
                  v-model="formParams.lastName"
                  :class="showHelpBlock1 ? 'show-help' : ''"
                />
              </div>
            </div>
            <div class="form-item-bottom">
              <small class="help-block" v-show="showHelpBlock1">Required</small>
            </div>
          </section>
        </div>
      </div>
    </my-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { payBill, payRequest } from "@/api/index";
import { toThousands } from "@/util/tool.js";
import myDialog from "@/components/my-dialog";
import myHeader from "@/components/my-header";
import myStep from "@/components/my-step";
import myLoading from "@/components/my-loading";
export default {
  data() {
    return {
      showHelpBlock: false,
      showPayError: false,
      showDialog: false,
      isPay: false,
      showLoading: false,
      email: "",
      formParams: {
        amount: "",
        payPhone: "",
        orderNo: ""
      },
      rightAmount: ""
    };
  },
  computed: {
    disabled() {
      let flag = false;
      if (this.isPay) {
        flag = true;
      }
      return flag;
    }
  },
  watch: {
    formParams: {
      handler() {
        const { payPhone } = this.formParams;
        // payPhone
        if (payPhone.trim().length !== 12) {
          this.showHelpBlock = true;
          this.isPay = false;
          this.showPayError = false;
        } else {
          this.showHelpBlock = false;
        }
      },
      deep: true
    }
  },
  mounted() {
    // 从session拿手机号
    let payInfo = JSON.parse(sessionStorage.getItem("payInfo"));
    let mySponsor = JSON.parse(sessionStorage.getItem("mySponsor"));
    this.rightAmount = mySponsor.payAmount;
    this.formParams.amount = toThousands(mySponsor.payAmount);
    this.formParams.payPhone = payInfo.phone;
    this.formParams.orderNo = mySponsor.orderNo;
    this.email = payInfo.email;

    // 获取支付信息
    this.payBill();
  },
  methods: {
    async payBill() {
      // 从session拿注册信息
      let info = JSON.parse(sessionStorage.getItem("payInfo"));
      let res = await payBill(info);
      let errcode = res.code;
      if (errcode === 0) {
        // 存到session
        sessionStorage.setItem("mySponsor", JSON.stringify(res.data));
      }
    },
    async payHandle() {
      this.isPay = true;
      this.showLoading = true;
      this.showDialog = true;
      let res1 = await payRequest(this.formParams);
      if (res1) this.showLoading = false;
      let errcode1 = res1.code;
      if (errcode1 === 101) {
        // 请求失败
        this.showPayError = true;
      }
    },
    dialogHandle() {}
  },
  components: {
    "my-dialog": myDialog,
    "my-header": myHeader,
    "my-step": myStep,
    "my-loading": myLoading
  }
};
</script>

<style scoped lang="stylus">
#payment-cont
  .pay-mid
    padding 20px
    background #fff
    margin-bottom 38px
    margin-top 20px
    .top-tips
      font-size 14px
      font-family PingFang-SC-Bold, PingFang-SC
      font-weight bold
      color #575757
      line-height 30px
      @media (max-width: 980px)
        font-size 13px
        line-height 1.5
        font-weight normal
        padding 10px
    .pay-main
      display flex
      margin 50px 0
      .pay-info
        flex 0.47
        // padding-right 30px
        .img-wrap
          margin-right 30px
          img
            display block
            max-width 100%
      .pay-account
        flex 0.53
        padding-left 30px
        border-left 1px solid #B7B7B7
        .pay-account-main
          margin 28px 0 20px 0
          padding 30px 20px
          background-color #fafafa
          .pay-error
            position absolute
            color #a94442
          .form-box
            display flex
            margin-top 40px
            .form-input
              display flex
              border 1px solid #C1C3C3
              .form-input-label
                font-weight bold
                padding 8px 20px
                color #4AA3D7
                border-right 1px solid #BABABA
              .form-input-inner
                color #575757
                padding 8px 20px
                box-shadow rgb(230, 240, 243) 0px 0px 0px 100px inset
                &.show-help
                  box-shadow rgb(255, 174, 174) 0px 0px 0px 100px inset
                  &::placeholder
                    color #fff
          .form-bottom
            .help-block
              color #a94442
      .form-button
        color #fff
        background-color #5BA2CC
        margin-left 20px
        padding 10px 49px
        border-radius 4px
        &:hover
          background-color #286090
        &:disabled
          color #fff
          opacity 0.2
          background-color #5BA2CC
      ul
        margin 30px 0 0 10px
        li
          line-height 40px
          .info-title
            color #5BA2CC
            margin-right 10px
          .info-content
            color #575757
  .form-wrap-box
    display flex
    flex 1
    &:nth-child(2n)
      margin-left 40px
    @media (max-width: 980px)
      display block
      margin 0
    .form-item
      flex 1
      @media (max-width: 980px)
        margin 12px 0
        background-color #fff
        flex-direction column
      .form-item-top
        display flex
        background-color #E6F0F3
        height 40px
        line-height 40px
        .item-lable
          font-weight bold
          border-right 1px solid #BABABA
          color #4295C5
          height 20px
          line-height 20px
          margin 10px 0 10px 20px
          padding-right 10px
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
          &.nth-child(2)
            margin-left 10px
          .item-main-inner
            flex 1
            height 100%
            color rgb(87, 87, 87)
            &.show-help
              box-shadow rgb(255, 174, 174) 0px 0px 0px 100px inset
              &::placeholder
                color #fff
            .item-main-help
              color #a94442
              font-weight normal
              @media (max-width: 980px)
                display none
                margin-top 4px
          .item-icon
            color #ccc
      .form-item-bottom
        display flex
        height 20px
        line-height 20px
        .help-block
          color #a94442
          @media (max-width: 980px)
            display none
            margin-top 4px
</style>
