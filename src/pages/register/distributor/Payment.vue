<template>
  <div id="payment-cont">
    <my-header>
      <a :href="BASE_URL">Register</a>
      <span>/ Distributor Register</span>
    </my-header>
    <my-step>
      <img src="../../../../static/img/payment.png" alt />
    </my-step>
    <div class="pay-mid">
      <p
        class="top-tips"
      >Step three, please pay a KES {{formParams.amount}} registration fee only by M-pesa and the welcome kits will be delievered for you.</p>
      <div class="pay-main">
        <section class="pay-info">
          <div class="img-wrap">
            <img src="../../../../static/img/payment_banner.png" alt />
          </div>
          <ul>
            <li>
              <span class="info-title">User:</span>
              <span class="info-content">{{account}}</span>
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
        <section ref="payAccount" class="pay-account">
          <p>Please pay the EXACT amount to complete your order</p>
          <div class="pay-account-main">
            <p
              ref="notOpened"
              class="pay-error"
            >Sorry,your phone hasn't been opened for M-pesa payment.</p>
            <form class="form">
              <div class="form-box">
                <div class="form-input">
                  <label class="form-input-label" for="payPhone">Your Phone</label>
                  <input
                    id="payPhone"
                    class="form-input-inner"
                    type="number"
                    placeholder="Phone Number"
                    v-model="formParams.payPhone"
                    maxlength="12"
                    oninput="if(value.length>12)value=value.slice(0,12)"
                  />
                </div>
                <button
                  ref="payBtn"
                  class="form-button"
                  type="button"
                  @click="payRequest"
                  :disabled="payBtnDisabled"
                >Pay</button>
              </div>
              <div class="form-bottom">
                <small ref="phoneEmpty" class="help-block">Format Error</small>
              </div>
            </form>
            <!-- loading -->
            <my-loading :show="showLoading"></my-loading>
            <ul ref="payUl">
              <li>
                <span class="info-title">Mpesa Paybill:</span>
                <span class="info-content">{{paybill}}</span>
              </li>
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
          <button
            class="form-button"
            type="button"
            @click="$router.push('/register/distributor/personal')"
          >Skip</button>
        </section>
        <!-- 支付失败盒子 -->
        <section ref="payFailBox" class="pay-account" style="display:none">
          <p>Sorry，payment failed, please repay</p>
          <div class="pay-account-main">
            <img class="fail-img" src="../../../../static/img/payment_fail.png" alt />
          </div>
          <button class="form-button" type="button" @click="repayHandle">Repay</button>
        </section>
      </div>
    </div>
    <!-- 填写收货地址弹窗 -->
    <my-dialog
      title="Shipping Address"
      :showDialog="showDialog"
      @dialogHandle="dialogHandle"
      @closeDialog="dialogHandle(false)"
      showCancel
    >
      <div slot="dialog-text" class="dialog-text">
        You have successfully registered and you are now a BF Suma
        distributor.
        Please write the address where you will want your welcome kit delivered or send. Thank you
      </div>
      <div slot="dialog-table" class="dialog-table">
        <ValidationObserver
          ref="observer"
          @submit.prevent="onSubmit"
          v-slot="{ invalid }"
          tag="form"
          class="form"
        >
          <!-- name -->
          <div class="form-wrap-box">
            <section class="form-item">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="form-item-top">
                  <label class="item-lable">*Name</label>
                  <div class="item-main">
                    <input
                      type="text"
                      class="item-main-inner"
                      placeholder="First Name"
                      v-model="dialogParams.firstName"
                    />
                  </div>
                </div>
                <div class="form-item-bottom">
                  <span class="help-block">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </section>
            <section class="form-item" style="margin-left:16px">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="form-item-top">
                  <div class="item-main">
                    <input
                      class="item-main-inner"
                      type="text"
                      placeholder="Last Name"
                      v-model="dialogParams.lastName"
                    />
                  </div>
                </div>
                <div class="form-item-bottom">
                  <span class="help-block">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </section>
          </div>
          <!-- Phone -->
          <div class="form-wrap-box">
            <section class="form-item">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="form-item-top">
                  <label class="item-lable">*Phone</label>
                  <div class="item-main">
                    <select
                      class="item-main-inner"
                      name="phoneHead"
                      id="phoneHead"
                      v-model="dialogParams.phoneHead"
                    >
                      <option style="display: none;" value="Aera Cod">Aera Cod</option>
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
                  <span class="help-block">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </section>
            <section class="form-item" style="margin-left:16px">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="form-item-top">
                  <div class="item-main">
                    <input
                      class="item-main-inner"
                      type="number"
                      placeholder="Phone Number"
                      v-model="dialogParams.phoneBody"
                      oninput="if(value.length>9)value=value.slice(0,9)"
                    />
                  </div>
                </div>
                <div class="form-item-bottom">
                  <span class="help-block">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </section>
          </div>
          <!-- address -->
          <div class="form-wrap-box">
            <section class="form-item">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="form-item-top" style="height:60px;">
                  <label class="item-lable" style="height:40px;line-height:40px">*Address</label>
                  <div class="item-main">
                    <textarea
                      class="item-main-inner"
                      style="padding-top:15px"
                      type="text"
                      placeholder="Street Name/Building/Apartment No./Floor"
                      v-model="dialogParams.address"
                      autofocus
                    ></textarea>
                  </div>
                </div>
                <div class="form-item-bottom">
                  <span class="help-block">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </section>
          </div>
          <div class="form-wrap-box">
            <!-- country -->
            <section class="form-item">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="form-item-top">
                  <label class="item-lable">*Country</label>
                  <div class="item-main">
                    <select class="item-main-inner" v-model="dialogParams.country">
                      <option disabled value style="display:none;">Choose Country</option>
                      <option
                        :value="country.value"
                        v-for="(country,index) in countryList"
                        :key="index"
                      >{{country.text}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-item-bottom">
                  <span class="help-block">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </section>
            <!-- city -->
            <section class="form-item" style="margin-left:16px">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="form-item-top">
                  <label class="item-lable">*City</label>
                  <div class="item-main">
                    <select class="item-main-inner" v-model="dialogParams.city">
                      <option disabled value style="display:none;">Choose City</option>
                      <option value="NAIROBI">NAIROBI</option>
                      <option value="BUNGOMA">BUNGOMA</option>
                      <option value="KISUMU">KISUMU</option>
                      <option value="KISII">KISII</option>
                      <option value="ELDORET">ELDORET</option>
                      <option value="KITALE">KITALE</option>
                      <option value="NAKURU">NAKURU</option>
                      <option value="EMBU">EMBU</option>
                      <option value="KIRIAINI">KIRIAINI</option>
                      <option value="MOMBASA">MOMBASA</option>
                      <option value="KAKAMEGA">KAKAMEGA</option>
                    </select>
                  </div>
                </div>
                <div class="form-item-bottom">
                  <span class="help-block">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </section>
          </div>
        </ValidationObserver>
      </div>
    </my-dialog>
    <!-- 错误提示框 -->
    <my-toast :toastText="toastText" :showToast="showToast" @closeToast="showToast=false"></my-toast>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  BASE_URL,
  payBill,
  payRequest,
  payStatus,
  distributorCustomer,
  distributorUpgrade,
  distributorAddress
} from "@/api/index";
import { toThousands } from "@/util/tool.js";
import myDialog from "@/components/my-dialog";
import myHeader from "@/components/my-header";
import myStep from "@/components/my-step";
import myLoading from "@/components/my-loading";
import myToast from "@/components/my-toast";
export default {
  data() {
    return {
      BASE_URL: BASE_URL,
      showDialog: false,
      showLoading: false,
      payBtnDisabled: false,
      showToast: false,
      toastText: "",
      account: "",
      paybill: "",
      rightAmount: "",
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
      ],
      // 页面参数
      formParams: {
        amount: "",
        payPhone: "",
        orderNo: ""
      },
      // 弹窗参数
      dialogParams: {}
    };
  },
  watch: {
    formParams: {
      handler() {
        // payPhone
        if (this.formParams.payPhone.trim().length !== 12) {
          this.$refs.phoneEmpty.style.display = "block";
          this.payBtnDisabled = true;
        } else {
          this.$refs.phoneEmpty.style.display = "none";
          this.payBtnDisabled = false;
        }
      },
      deep: true
    }
  },
  mounted() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let customerInfo = sessionStorage.getItem("customerInfo");
    let id = customerInfo || user.id;
    this.distributorCustomer(id);
    this.payBill(id);

    // let userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
    // if (userLogin) {
    //   //直接登录后进来的
    //   this.account = userLogin.account;
    //   let user = JSON.parse(sessionStorage.getItem("user"));
    //   this.distributorCustomer(user.id);
    //   this.payBill(user.id);
    // } else {
    //   //注册后进来的
    //   let distributorId = sessionStorage.getItem("distributorId");
    //   let distInformation = JSON.parse(
    //     sessionStorage.getItem("distInformation")
    //   );
    //   distInformation.distributorId = distributorId;
    //   this.payBill(distInformation);

    //   let id = sessionStorage.getItem("customerInfo");
    //   this.distributorCustomer(id);
    // }

    // let mySponsor = JSON.parse(sessionStorage.getItem("mySponsor"));
  },
  methods: {
    // 获取基本信息
    async distributorCustomer(id) {
      let res = await distributorCustomer(id);
      if (!res) {
      } else {
        let rescode = res.code;
        let data = res.data;
        if (rescode === 0) {
          this.formParams.payPhone = data.phone;
          this.account = data.email;
          const { phone, firstName, lastName, country, city } = data;
          let phoneHead = phone.slice(0, 3);
          let phoneBody = phone.slice(3);
          this.dialogParams.firstName = firstName;
          this.dialogParams.lastName = lastName;
          this.dialogParams.phoneHead = phoneHead;
          this.dialogParams.phoneBody = phoneBody;
          this.dialogParams.country = country;
          this.dialogParams.city = city;
        }
      }
    },
    // 获取基本信息
    async payBill(id) {
      let res = await payBill(id);
      if (!res) {
        console.error(res.fullMessage);
      } else {
        let rescode = res.code;
        let data = res.data;
        if (rescode === 0) {
          this.paybill = data.paybill;
          this.formParams.orderNo = data.orderNo;
          this.formParams.amount = toThousands(data.payAmount);
          this.rightAmount = data.payAmount;
          // 存到session
          sessionStorage.setItem("mySponsor", JSON.stringify(data));
        }
      }
    },
    // 发起支付请求
    async payRequest() {
      this.showLoading = true;
      this.$refs.payUl.style.display = "none";
      let res = await payRequest(this.formParams);
      if (!res) {
        console.log("失败了");
      } else {
        this.showLoading = false;
        this.$refs.payUl.style.display = "block";
        let rescode = res.code;
        if (rescode === 0) {
          // 按钮倒计时
          let time = 60;
          this.interval = setInterval(() => {
            this.payBtnDisabled = true;
            time = time < 10 ? "0" + time : time;
            this.$refs.payBtn.innerHTML = time + "s";
            time--;
            if (time === 0) {
              clearInterval(this.interval);
              this.payBtnDisabled = false;
              this.$refs.payBtn.innerHTML = "Pay";
            }
          }, 1000);
          this.payStatus();
        }
        if (rescode === 101) {
          // 支付失败
          this.$refs.notOpened.style.display = "block";
          this.$refs.payAccount.style.display = "none";
          this.$refs.payFailBox.style.display = "block";
        }
      }
    },
    // 获取支付状态
    async payStatus() {
      let res = await payStatus(this.formParams.orderNo);
      if (!res) {
        console.log("失败啦");
      } else {
        const rescode = res.code;
        if (rescode === 0) {
          this.distributorUpgrade();
          this.showDialog = true;
          // 表单默认赋值
        }
        if ([201].includes(rescode)) {
          //失败处理
          console.log("支付状态失败啦");
          this.$refs.notOpened.style.display = "block";
          this.$refs.payAccount.style.display = "none";
          this.$refs.payFailBox.style.display = "block";
        }
      }
    },
    // 顾客升级为经销商
    async distributorUpgrade() {
      let distInformation = JSON.parse(
        sessionStorage.getItem("distInformation")
      );
      let distSponsor = JSON.parse(sessionStorage.getItem("distSponsor"));
      let customerInfo = sessionStorage.getItem("customerInfo");
      let distributorId = sessionStorage.getItem("distributorId");
      if (distInformation && distSponsor && distributorId) {
        let reqData = Object.assign(distInformation, distSponsor, {
          id: customerInfo
        });
        let res = await distributorUpgrade(reqData);
        if (!res) {
          console.log("失败啦");
          return;
        } else {
          let rescode = res.code;
          if (rescode === 0) {
            const resdata = res.data;
            sessionStorage.setItem("myDistributorId", resdata);
            this.showDialog = true;
          }
          if ([101, 102, 103, 104].includes(rescode)) {
            this.showToast = true;
            this.toastText = "Payment failure";
            clearInterval(this.interval);
          }
        }
      }
    },
    async distributorAddress() {
      const reqData = Object.assign({}, this.dialogParams);
      reqData.province = "aac";
      reqData.phone = reqData.phoneHead + reqData.phoneBody;
      let distributorNo = sessionStorage.getItem("myDistributorId");
      reqData.distributorNo = distributorNo || "";

      console.log(reqData);
      let res = await distributorAddress(reqData);
      if (!res) {
        console.log("提交地址信息失败啦");
      } else {
        const rescode = res.code;
        if (rescode === 0) {
          this.$router.replace("/register/distributor/business");
        }
        if (rescode === 101) {
          console.error(res.fullMessage);
        }
      }
    },
    dialogHandle(flag) {
      if (flag) {
        // 确定
        this.onSubmit();
      } else {
        // 取消
        this.$router.replace("/register/distributor/business");
      }
    },
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      this.distributorAddress();
    },
    repayHandle() {
      this.$refs.payFailBox.style.display = "none";
      this.$refs.payAccount.style.display = "block";
    }
  },
  components: {
    "my-dialog": myDialog,
    "my-header": myHeader,
    "my-step": myStep,
    "my-loading": myLoading,
    "my-toast": myToast
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
            display none
            position absolute
            color #a94442
          .fail-img
            display block
            margin auto
            width 193px
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
          cursor not-allowed
          color #fff
          opacity 0.5
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
          font-size 12px
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
            padding-left 10px
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
          font-size 12px
          color #a94442
          @media (max-width: 980px)
            display none
            margin-top 4px
</style>
