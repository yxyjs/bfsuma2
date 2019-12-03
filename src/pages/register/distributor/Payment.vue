<template>
  <div id="payment-cont">
    <my-header>
      <a href="javascript:;" @click="$router.replace('/register')">Register</a>
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
          <ul class="info-ul">
            <li class="info-li">
              <span class="info-title">User:</span>
              <span class="info-content">{{account}}</span>
            </li>
            <li class="info-li">
              <span class="info-title">Order:</span>
              <span class="info-content">{{formParams.orderNo}}</span>
            </li>
            <li class="info-li">
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
              <!-- 支付方式 -->
              <div class="pay-methods">
                <ul class="pay-ul">
                  <li
                    v-for="(method,index) in payMethods"
                    :key="index"
                    @click="choosePayMethods(index)"
                    class="pay-li"
                    :class="{'current':index === currentPayIndex}"
                  >
                    <div class="methods-box" :class="{'current':index === currentPayIndex}">
                      <img
                        class="methods-box-logo"
                        :src="'http://touchdev.bfsuma.com/' + method.logo"
                        alt
                      />
                      <span class="methods-box-name">{{method.name}}</span>
                    </div>
                    <div v-show="index === currentPayIndex" class="methods-bottom">
                      <div class="form-box">
                        <div class="form-input">
                          <label class="form-input-label" for="payPhone">Your Phone</label>
                          <input
                            id="payPhone"
                            class="form-input-inner"
                            type="number"
                            placeholder="Phone Number"
                            v-model="formParams.payPhone"
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
                    </div>
                    <div ref="payUl" class="account-box">
                      <p class="account-p">
                        <span class="info-title">Mpesa Paybill:</span>
                        <span class="info-content">{{paybill}}</span>
                      </p>
                      <p class="account-p">
                        <span class="info-title">Account:</span>
                        <span class="info-content">SUMA HEALTH PRODUCTS CO.LTD</span>
                      </p>
                      <p class="account-p">
                        <span class="info-title">Amount:</span>
                        <span class="info-content">KES{{rightAmount}}.00</span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
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
            <section class="form-item margin-l">
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
                      <option style="display: none;" value="Aera Code">Aera Code</option>
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
            <section class="form-item margin-l">
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
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              class="form-item"
              tag="section"
            >
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
          </div>
          <div class="form-wrap-box">
            <!-- country -->
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              class="form-item"
              tag="section"
            >
              <div class="form-item-top">
                <label class="item-lable">*Country</label>
                <div class="item-main">
                  <select
                    ref="selectCountry"
                    class="item-main-inner"
                    v-model="dialogParams.country"
                    @change="countryChange"
                  >
                    <option disabled value style="display:none;">Choose Country</option>
                    <option
                      :value="country.name"
                      v-for="(country,index) in countryList"
                      :key="index"
                    >{{country.name}}</option>
                  </select>
                </div>
              </div>
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <!-- city -->
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              class="form-item margin-l"
              tag="section"
            >
              <div class="form-item-top">
                <label class="item-lable">*City</label>
                <div class="item-main">
                  <select
                    id="city"
                    ref="selectCity"
                    class="item-main-inner"
                    v-model="dialogParams.city"
                  >
                    <option disabled value style="display:none;">Choose City</option>
                    <option
                      :value="city.name"
                      v-for="(city,index) in cityList"
                      :key="index"
                    >{{city.name}}</option>
                  </select>
                </div>
              </div>
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
        </ValidationObserver>
      </div>
    </my-dialog>
    <mobile-loading :showMobileLoading="showMobileLoading" />
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
  distributorAddress,
  getAllCountry,
  getAllCity,
  getAllpayMethods
} from "@/api/index";
import { toThousands } from "@/util/tool.js";
import myDialog from "@/components/my-dialog";
import myHeader from "@/components/my-header";
import myStep from "@/components/my-step";
import myLoading from "@/components/my-loading";
import mobileLoading from "@/components/mobile-loading";
import myToast from "@/components/my-toast";
export default {
  data() {
    return {
      BASE_URL: BASE_URL,
      showDialog: false,
      showLoading: false,
      showMobileLoading: false,
      payBtnDisabled: false,
      showToast: false,
      toastText: "",
      account: "",
      paybill: "",
      rightAmount: "",
      countryList: [],
      cityList: [],
      formParams: {
        // 页面参数对象
        amount: "",
        payPhone: "",
        orderNo: ""
      },
      dialogParams: {}, // 弹窗参数对象
      payMethods: [], //支付方式
      currentPayIndex: 0 //当前支付方式
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
          // console.log(this.$refs.phoneEmpty.style)
          // this.$refs.phoneEmpty.style.display = "none";
          // this.payBtnDisabled = false;
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getAllCountry();
    const cityList = JSON.parse(sessionStorage.getItem("cityList"));
    if (cityList) {
      this.cityList = cityList;
    }

    this.getAllpayMethods();

    let user = JSON.parse(sessionStorage.getItem("user"));
    let customerInfo = sessionStorage.getItem("customerInfo");
    let id = customerInfo || user.id;
    const mySponsor = JSON.parse(sessionStorage.getItem("mySponsor"));
    if (!mySponsor) {
      this.payBill(id);
    } else {
      this.paybill = mySponsor.paybill;
      this.formParams.orderNo = mySponsor.orderNo;
      this.formParams.amount = toThousands(mySponsor.payAmount);
      this.rightAmount = mySponsor.payAmount;
    }

    const distInformation = JSON.parse(
      sessionStorage.getItem("distInformation")
    );
    if (distInformation) {
      const { email, phone } = distInformation;
      this.account = email;
      this.formParams.payPhone = phone;
    }
  },
  methods: {
    // 获取所有国家
    async getAllCountry() {
      let res = await getAllCountry();
      const rescode = res.code;
      if (rescode === 0) {
        const resdata = res.data;
        this.countryList = resdata;
      } else {
        console.error(res.fullMessage);
      }
    },
    // 获取选中国家下面所有的城市
    async getAllCity(areaCode) {
      let res = await getAllCity(areaCode);
      const rescode = res.code;
      if (rescode === 0) {
        const resdata = res.data;
        this.cityList = resdata;
        sessionStorage.setItem("cityList", JSON.stringify(resdata));
      } else {
        console.error(res.fullMessage);
      }
    },
    async getAllpayMethods() {
      let res = await getAllpayMethods();
      const rescode = res.code;
      if (rescode === 0) {
        const resdata = res.data;
        this.payMethods = resdata;
      } else {
        console.error(res.fullMessage);
      }
    },
    // 获取顾客信息
    async distributorCustomer(id) {
      let res = await distributorCustomer(id);
      const rescode = res.code;
      if (rescode === 0) {
        const resdata = res.resdata;
        const { email, phone, firstName, lastName, country, city } = resdata;
        this.formParams.payPhone = phone;
        this.account = email;
        this.dialogParams.firstName = firstName;
        this.dialogParams.lastName = lastName;
        this.dialogParams.phone = phone;
        this.dialogParams.phoneHead = phone.slice(0, 3);
        this.dialogParams.phoneBody = phone.slice(3);
        this.dialogParams.country = country;
        this.dialogParams.city = city;
      }
    },
    // 获取支付信息
    async payBill(id) {
      let res = await payBill(id);
      const rescode = res.code;
      if (rescode === 0) {
        const resdata = res.data;
        this.paybill = resdata.paybill;
        this.formParams.orderNo = resdata.orderNo;
        this.formParams.amount = toThousands(resdata.payAmount);
        this.rightAmount = resdata.payAmount;
        sessionStorage.setItem("mySponsor", JSON.stringify(resdata));
      }
    },
    // 发起支付请求
    async payRequest() {
      this.showMobileLoading = true;
      // this.$refs.payUl.style.display = "none";
      let res = await payRequest(this.formParams);
      this.showMobileLoading = false;
      // this.$refs.payUl.style.display = "block";
      const rescode = res.code;
      if (rescode === 0) {
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
        this.$refs.notOpened.style.display = "block";
        this.$refs.payAccount.style.display = "none";
        this.$refs.payFailBox.style.display = "block";
      }
    },
    // 获取支付状态
    async payStatus() {
      let res = await payStatus(this.formParams.orderNo);
      const rescode = res.code;
      if (rescode === 0) {
        this.distributorUpgrade();
      }
      if ([201].includes(rescode)) {
        console.error("支付状态失败啦");
        this.$refs.notOpened.style.display = "block";
        this.$refs.payAccount.style.display = "none";
        this.$refs.payFailBox.style.display = "block";
      }
    },
    // 经销商升级
    async distributorUpgrade() {
      this.showDialog = true;
      // 给dialog赋值
      const distInformation = JSON.parse(
        sessionStorage.getItem("distInformation")
      );
      const distSponsor = JSON.parse(sessionStorage.getItem("distSponsor"));
      const customerInfo = sessionStorage.getItem("customerInfo");
      const distributorId = sessionStorage.getItem("distributorId");
      if (!distInformation) {
        this.distributorCustomer(customerInfo);
      } else {
        const {
          email,
          phone,
          firstName,
          lastName,
          country,
          city
        } = distInformation;
        this.dialogParams.firstName = firstName;
        this.dialogParams.lastName = lastName;
        this.dialogParams.phone = phone;
        this.dialogParams.phoneHead = phone.slice(0, 3);
        this.dialogParams.phoneBody = phone.slice(3);
        this.dialogParams.country = country;
        this.dialogParams.city = city;
      }

      if (distInformation && distSponsor && distributorId) {
        let reqData = Object.assign(
          distInformation,
          distSponsor,
          this.formParams,
          {
            id: customerInfo
          }
        );
        let res = await distributorUpgrade(reqData);
        const rescode = res.code;
        if (rescode === 0) {
          const resdata = res.data;
          sessionStorage.setItem("myDistributorId", resdata);
        }
        if ([101, 102, 103, 104].includes(rescode)) {
          this.showToast = true;
          this.toastText = "Payment failure";
          clearInterval(this.interval);
        }
      }
    },
    // 成功后提交地址信息
    async distributorAddress() {
      const reqData = Object.assign({}, this.dialogParams);
      const distributorNo = sessionStorage.getItem("myDistributorId");
      if (distributorNo) {
        reqData.distributorNo = distributorNo;
      }
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        reqData.distributorNo = user.id;
      }

      let res = await distributorAddress(reqData);
      this.showMobileLoading = false;
      const rescode = res.code;
      if (rescode === 0) {
        reqData.phone = reqData.phoneHead + reqData.phoneBody;
        sessionStorage.setItem("addressInformation", JSON.stringify(reqData));
        this.$router.replace("/register/distributor/business");
      }
      if (rescode === 101) {
        if (this.BASE_URL === "http://172.18.1.240:73") {
          reqData.phone = reqData.phoneHead + reqData.phoneBody;
          sessionStorage.setItem("addressInformation", JSON.stringify(reqData));
          this.$router.replace("/register/distributor/business");
        } else {
          console.error(res.fullMessage);
        }
      }
    },
    // 提交表单
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.showToast = true;
        this.toastText = "Please check required";
        return;
      }
      this.showMobileLoading = true;
      this.distributorAddress();
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
    countryChange(event) {
      this.dialogParams.city = "";
      this.cityList = [];
      const value = event.target.value;
      this.dialogParams.country = value;

      const countryList = this.countryList;
      for (let i = 0; i < countryList.length; i++) {
        if (countryList[i].name === this.dialogParams.country) {
          const areaCode = countryList[i].areaCode;
          this.getAllCity(areaCode);
          sessionStorage.setItem("areaCode", areaCode);
        }
      }
    },
    choosePayMethods(index) {
      this.currentPayIndex = index;
    },
    repayHandle() {
      this.$refs.payFailBox.style.display = "none";
      this.$refs.payAccount.style.display = "block";
    },
    beforeDestroy() {
      clearInterval(this.interval);
    }
  },
  components: {
    "my-dialog": myDialog,
    "my-header": myHeader,
    "my-step": myStep,
    "my-loading": myLoading,
    "mobile-loading": mobileLoading,
    "my-toast": myToast
  }
};
</script>

<style scoped lang="stylus">
@import '../../../../static/stylus/common.styl'

#payment-cont
  .pay-mid
    padding 20px
    background #fff
    margin-bottom 38px
    margin-top 20px
    @media (max-width: 980px)
      padding 8px
      margin 0
    .top-tips
      font-size 14px
      font-weight bold
      color #575757
      line-height 30px
      @media (max-width: 980px)
        font-size 13px
        line-height 1.5
        font-weight normal
    .pay-main
      display flex
      margin 50px 0
      @media (max-width: 980px)
        display block
        margin 10px 0
      .pay-info
        flex 0.47
        .img-wrap
          margin-right 30px
          @media (max-width: 980px)
            margin-right 0
          img
            display block
            max-width 100%
        .info-ul
          margin 30px 0 0 10px
          @media (max-width: 980px)
            margin 10px 10px 0 10px
          .info-li
            line-height 40px
            @media (max-width: 980px)
              display flex
              justify-content space-between
              line-height 26px
            .info-title
              color #5BA2CC
              margin-right 10px
            .info-content
              color #575757
      .pay-account
        flex 0.53
        padding-left 30px
        border-left 1px solid #B7B7B7
        @media (max-width: 980px)
          border-left none
          border-1px-t(#ccc)
          padding-left 0
          padding-top 10px
          margin-top 10px
        .pay-account-main
          margin 28px 0 20px 0
          padding 30px 20px
          background-color #fafafa
          @media (max-width: 980px)
            padding 10px
          .pay-error
            display none
            position absolute
            color #a94442
          .fail-img
            display block
            margin auto
            width 193px
          .form
            height 400px
            overflow auto
            .pay-methods
              overflow auto
              .pay-ul
                .pay-li
                  margin 8px 0
                  border 1px solid #CFD3D2
                  border-radius 10px
                  &.current
                    border 1px solid #56A7D8
                    overflow hidden
                  .methods-box
                    display flex
                    padding 6px 10px
                    &.current
                      background-color #5ba2cc
                      color #fff
                    .methods-box-logo
                      max-width 30px
                      max-height 30px
                    .methods-box-name
                      padding-left 10px
                      line-height 30px
                  .methods-bottom
                    padding 16px 10px
                    .form-box
                      display flex
                      .form-input
                        display flex
                        align-items center
                        .form-input-label
                          font-weight bold
                          padding 8px 20px
                          color #4AA3D7
                          @media (max-width: 980px)
                            padding 0
                        .form-input-inner
                          color #575757
                          padding 11px 20px
                          box-shadow rgb(230, 240, 243) 0px 0px 0px 100px inset
                          @media (max-width: 980px)
                            padding 8px 0 8px 8px
                          &.show-help
                            box-shadow rgb(255, 174, 174) 0px 0px 0px 100px inset
                            &::placeholder
                              color #fff
                    .form-bottom
                      .help-block
                        display none
                        color #a94442
      .form-button
        color #fff
        background-color #5BA2CC
        margin-left 20px
        padding 10px 49px
        border-radius 4px
        @media (max-width: 980px)
          margin-left 6px
          padding 10px 20px
        &:hover
          background-color #286090
        &:disabled
          cursor not-allowed
          color #fff
          opacity 0.5
          background-color #5BA2CC
      .account-box
        margin 0 0 0 10px
        @media (max-width: 980px)
          margin 0 0 0 8px
        .account-p
          line-height 30px
          @media (max-width: 980px)
            line-height 24px
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
        background-color #fff
        flex-direction column
      &.margin-l
        margin-left 16px
        @media (max-width: 980px)
          margin-left 0
      .form-item-top
        display flex
        background-color #E6F0F3
        height 40px
        line-height 40px
        @media (max-width: 980px)
          height 30px
          line-height 30px
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
            margin 0
            border-right none
            height 30px
            line-height 30px
            font-weight normal
          &.hidden-lable
            display none
            @media (max-width: 980px)
              display block
              opacity 0
              margin 3px
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
</style>
