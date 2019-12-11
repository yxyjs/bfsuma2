<template>
  <div id="payment-cont">
    <SumaHeader path="payment" @handleExit="handleExit"></SumaHeader>
    <my-header>
      <a v-if="showLoginRouter" href="javascript:;" @click="$router.replace('/login')">Login</a>
      <a v-else href="javascript:;" @click="$router.replace('/register')">Register</a>
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
            <ValidationObserver
              ref="observerPay"
              @submit.prevent="payRequest"
              v-slot="{ invalid }"
              tag="form"
              class="form"
            >
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
                      <ValidationProvider tag="section" rules="required" v-slot="{ errors }">
                        <div class="form-box">
                          <div class="form-input">
                            <label class="form-input-label" for="payPhone">Your Phone</label>
                            <input
                              id="payPhone"
                              class="form-input-inner"
                              type="tel"
                              name="tel"
                              placeholder="Phone Number"
                              v-model.trim="formParams.payPhone"
                              @input="payPhoneBodyInput"
                              onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
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
                          <!-- <span ref="payPhoneFormatError" class="help-bloc">error</span> -->
                          <span ref="payPhoneFormatError" class="help-block">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div ref="payUl" class="account-box">
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
            </ValidationObserver>
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
          <p
            ref="notOpened"
            class="pay-error"
          >Sorry,your phone hasn't been opened for M-pesa payment.</p>
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
                    style="padding-top:6px"
                    type="text"
                    placeholder="Street Name/Building/Apartment No./Floor"
                    v-model.trim="dialogParams.address"
                  ></textarea>
                </div>
              </div>
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
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
                      v-model.trim="dialogParams.firstName"
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
                      v-model.trim="dialogParams.lastName"
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
                      @change="phoneHeadChange"
                      v-model="dialogParams.phoneHead"
                    >
                      <option style="display: none;" value="Aera Code">Aera Code</option>
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
            </section>
            <section class="form-item margin-l">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="form-item-top">
                  <div class="item-main">
                    <input
                      class="item-main-inner"
                      type="tel"
                      name="tel"
                      placeholder="Phone Number"
                      v-model.trim="dialogParams.phoneBody"
                      @input="phoneBodyInput"
                      onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                    />
                  </div>
                </div>
                <div class="form-item-bottom">
                  <span ref="phoneFormatError" class="help-block">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </section>
          </div>
        </ValidationObserver>
      </div>
    </my-dialog>
    <my-dialog
      title="Are you sure to exit？"
      :showDialog="showDialog1"
      @dialogHandle="dialogHandle1"
      showCancel
    >
      <div class="dialog-img" slot="dialog-img">
        <i class="iconfont icon--quetion-pane"></i>
      </div>
    </my-dialog>
    <mobile-loading :showMobileLoading="showMobileLoading" />
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
import { toThousands, session } from "@/util/tool.js";
import myDialog from "@/components/my-dialog";
import SumaHeader from "@/components/SumaHeader";
import myHeader from "@/components/my-header";
import myStep from "@/components/my-step";
import myLoading from "@/components/my-loading";
import mobileLoading from "@/components/mobile-loading";
import myToast from "@/components/my-toast";
export default {
  data() {
    return {
      BASE_URL: BASE_URL,
      showLoginRouter: false,
      showDialog: false,
      showDialog1: false,
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
      areaCodeArr: [],
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
  mounted() {
    this.getAllpayMethods();
    this.getAllCountry();
    const cityList = session.get("cityList");
    if (cityList) {
      this.cityList = cityList;
    }

    const areaCodeArr = session.get("areaCodeArr");
    if (areaCodeArr) {
      this.areaCodeArr = areaCodeArr;
    }

    let user = session.get("user") || {};
    let customerInfo = session.get("customerInfo");
    let id = "";
    if (customerInfo) {
      id = customerInfo;
    } else {
      id = user.id;
    }

    if (user) {
      this.showLoginRouter = true;
    }
    const mySponsor = session.get("mySponsor");
    if (!mySponsor) {
      this.payBill(id);
    } else {
      this.paybill = mySponsor.paybill;
      this.formParams.orderNo = mySponsor.orderNo;
      this.formParams.amount = toThousands(mySponsor.payAmount);
      this.rightAmount = mySponsor.payAmount;
    }

    const distInformation = session.get("distInformation");
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
        session.set("cityList", resdata);
      } else {
        console.error(res.fullMessage);
      }
    },
    // 获取所有支付方式
    async getAllpayMethods() {
      const distSponsor = session.get("distSponsor");
      const distInformation = session.get("distInformation");
      let country = "";
      if (distSponsor) {
        country = distSponsor.country;
      } else {
        country = distInformation.country;
      }
      let res = await getAllpayMethods(country);
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
        session.set("mySponsor", resdata);
      }
    },
    // 发起支付请求
    async payRequest() {
      const isValid = await this.$refs.observerPay.validate();
      if (!isValid) {
        return;
      }
      this.showMobileLoading = true;
      let res = await payRequest(this.formParams);
      this.showMobileLoading = false;
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
        console.error("支付失败啦");
        this.$refs.notOpened.style.display = "block";
        this.$refs.payAccount.style.display = "none";
        this.$refs.payFailBox.style.display = "block";
      }
    },
    // 经销商升级
    async distributorUpgrade() {
      // 给dialog赋值
      const distInformation = session.get("distInformation");
      const distSponsor = session.get("distSponsor");
      const customerInfo = session.get("customerInfo");
      const distributorId = session.get("distributorId");
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
          session.set("myDistributorId", resdata);
          this.showDialog = true;
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
      const distributorNo = session.get("myDistributorId");
      if (distributorNo) {
        reqData.distributorNo = distributorNo;
      }
      const user = session.get("user");
      if (user) {
        reqData.distributorNo = user.id;
      }

      let res = await distributorAddress(reqData);
      this.showMobileLoading = false;
      const rescode = res.code;
      if (rescode === 0) {
        reqData.phone = reqData.phoneHead + reqData.phoneBody;
        session.set("addressInformation", reqData);

        this.$router.replace("/register/distributor/business");
      }
      if (rescode === 101) {
        if (this.BASE_URL === "http://172.18.1.240:73") {
          reqData.phone = reqData.phoneHead + reqData.phoneBody;
          session.set("addressInformation", reqData);
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
    phoneHeadChange() {
      this.dialogParams.phoneBody = "";
    },
    payPhoneBodyInput(event) {
      let value = event.target.value;
      if (!/^\d+$/.test(value)) return;
      let numberLength, phoneHead;
      phoneHead = this.formParams.payPhone.substring(0, 3);
      const tenList = ["254", "255", "256", "264", "233", "237", "229"];
      if (tenList.includes(phoneHead)) {
        numberLength = 12;
      }
      if (phoneHead === "234") {
        numberLength = 13;
      }
      if (value.length >= numberLength) {
        value = value.slice(0, numberLength);
        this.$refs.payPhoneFormatError.innerHTML = "";
      } else {
        const arr = tenList;
        arr.push("234");
        if (!arr.includes(phoneHead)) {
          this.$refs.payPhoneFormatError.innerHTML = "";
        } else {
          this.$refs.payPhoneFormatError.innerHTML = "block";
        }
      }
      this.formParams.payPhone = value;
    },
    phoneBodyInput(event) {
      let value = event.target.value;
      if (!/^\d+$/.test(value)) return;
      let numberLength, phoneHead;
      phoneHead = this.dialogParams.phoneHead;
      const nineList = ["254", "255", "256", "264", "233", "237", "229"];
      if (nineList.includes(phoneHead)) {
        numberLength = 9;
      }
      if (phoneHead === "234") {
        numberLength = 10;
      }
      if (value.length >= numberLength) {
        value = value.slice(0, numberLength);
        this.$refs.phoneFormatError.innerHTML = "";
      } else {
        const arr = nineList;
        arr.push("234");
        if (!arr.includes(phoneHead)) {
          this.$refs.phoneFormatError.innerHTML = "";
        } else {
          this.$refs.phoneFormatError.innerHTML = "Format Error";
        }
      }
      this.dialogParams.phoneBody = value;
    },
    dialogHandle(flag) {
      if (flag) {
        // 确定
        this.onSubmit();
      } else {
        // 取消
        // this.$router.replace("/register/distributor/business");
        this.distributorAddress();
      }
    },
    countryChange(event) {
      this.dialogParams.city = "";
      this.cityList = [];
      const value = event.target.value;
      this.dialogParams.country = value;

      const countryList = this.countryList;
      countryList.forEach(element => {
        if (element.name === value) {
          const areaCode = element.areaCode;
          this.getAllCity(areaCode);
          this.dialogParams.phoneHead = areaCode;
          session.set("areaCode", areaCode);
        }
      });
    },
    choosePayMethods(index) {
      this.currentPayIndex = index;
    },
    repayHandle() {
      this.$refs.payFailBox.style.display = "none";
      this.$refs.payAccount.style.display = "block";
      this.$refs.notOpened.style.display = "none";
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    handleExit() {
      this.showDialog1 = true;
    },
    dialogHandle1(flag) {
      if (flag) {
        session.clear();
        location.href = BASE_URL;
      } else {
        this.showDialog1 = false;
      }
    }
  },
  components: {
    "my-dialog": myDialog,
    "my-header": myHeader,
    "my-step": myStep,
    "my-loading": myLoading,
    "mobile-loading": mobileLoading,
    "my-toast": myToast,
    SumaHeader
  }
};
</script>

<style scoped lang="stylus">
@import '../../../../static/stylus/common.styl'

#payment-cont
  margin-top 132px
  @media (max-width: 980px)
    margin-top 50px
  .pay-mid
    padding 20px
    background #fff
    margin-bottom 38px
    margin-top 20px
    @media (max-width: 980px)
      padding 8px
      margin 0
    .top-tips
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
        .pay-error
          display none
          // position absolute
          color #a94442
        .pay-account-main
          margin 28px 0 20px 0
          padding 30px 20px
          background-color #fafafa
          @media (max-width: 980px)
            padding 10px
          .fail-img
            display block
            margin auto
            width 193px
          .form
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
                    @media (max-width: 980px)
                      padding 10px
                    .form-box
                      display flex
                      @media (max-width: 980px)
                        height 30px
                      .form-input
                        display flex
                        align-items center
                        .form-input-label
                          font-weight bold
                          padding 8px 20px
                          color #4AA3D7
                          @media (max-width: 980px)
                            padding 0 4px 0 0
                            font-size 12px
                            font-weight normal
                        .form-input-inner
                          color #575757
                          width 110px
                          padding 11px 20px
                          border 1px solid #ccc
                          @media (max-width: 980px)
                            padding 8px 0 8px 2px
                    .form-bottom
                      display flex
                      height 20px
                      line-height 20px
                      .help-block
                        font-size 12px
                        color #a94442
      .form-button
        color #fff
        background-color #5BA2CC
        margin-left 20px
        padding 10px 49px
        border-radius 4px
        @media (max-width: 980px)
          margin-left 6px
          padding 10px
          font-size 12px
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
      margin 0
      overflow hidden
    .form-item
      flex 1
      @media (max-width: 980px)
        background-color #fff
        flex-direction column
        width 100px
      &.margin-l
        margin-left 16px
        @media (max-width: 980px)
          margin-left 0
          border-left 10px solid #fff
      .form-item-top
        display flex
        background-color #E6F0F3
        height 40px
        line-height 40px
        @media (max-width: 980px)
          height 26px
          line-height 26px
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
            padding 0 0 0 4px
            border-right none
            height 26px
            line-height 26px
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
            @media (max-width: 980px)
              width 30%
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
        height 14px
        line-height 14px
        .help-block
          font-size 11px
          color #a94442
</style>
