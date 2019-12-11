<template>
  <div id="business-cont">
    <SumaHeader path="business" @handleExit="handleExit"></SumaHeader>
    <my-header>
      <a href="javascript:;" @click="$router.replace('/register')">Register</a>
      <span>/ Distributor Register</span>
    </my-header>
    <my-step>
      <img src="../../../../static/img/business.png" alt />
    </my-step>
    <div class="business-mid">
      <section class="md-item">
        <p class="item-title blue">Congratulations on your successful registration.</p>
        <p
          class="item-title"
        >The staff of BFSuma Kenya company will contact you to send your welcome kit.</p>
      </section>
      <section class="md-item">
        <p class="item-title" v-if="showEditAddress">
          <span>We will send you gifts at this address.</span>
          <button class="btn btn-change" @click="showDialog=true">change</button>
        </p>
        <p class="item-title" v-else>
          You have not filled in the shipping address yet.
          <button
            class="btn add-address"
            @click="showDialog=true"
          >Add Shipping Address</button>
        </p>
        <div class="item-content">
          <p>{{addressData.firstName}} {{addressData.lastName}} {{addressData.phone}}</p>
          <p>{{addressData.address}} {{addressData.city}} {{addressData.country}}</p>
        </div>
      </section>
      <section class="md-item">
        <p class="item-title">You can contact Kenya office directly to pick up your welcome kit.</p>
        <div class="item-content">
          <p>
            Kenya Office Tel：
            <span>+254 751377964</span>
          </p>
          <p>Address：3 Floor Empress building ,Ring Road , Westlands ,Nairobi ,Kenya</p>
        </div>
      </section>
      <section class="md-item">
        <p
          class="item-title red"
        >Please save your distributor ID picture and record your sponsor and your upline.</p>
        <div class="content-list">
          <section class="main-item">
            <p class="item-title">Your Distributor Card</p>
            <div class="item-list-box" style="border-left:none">
              <div class="item-list">
                <p>Distributor ID：</p>
                <p class="item-list-right">{{myDistributorId}}</p>
              </div>
              <div class="item-list">
                <p>Name：</p>
                <p
                  class="item-list-right"
                >{{distributorCard.firstName}}&nbsp;&nbsp;{{distributorCard.lastName}}</p>
              </div>
              <div class="item-list">
                <p>Phone:</p>
                <p class="item-list-right">{{distributorCard.phone}}</p>
              </div>
            </div>
          </section>
          <section class="main-item">
            <p class="item-title">Your Upline</p>
            <div class="item-list-box">
              <div class="item-list">
                <p>Distributor ID：</p>
                <p class="item-list-right">{{uplineData.membId || uplineData.distributorId}}</p>
              </div>
              <div class="item-list">
                <p>Name：</p>
                <p class="item-list-right">{{uplineData.name || uplineData.distributorName}}</p>
              </div>
              <div class="item-list">
                <p>Address：</p>
                <p class="item-list-right">{{uplineData.city}}&nbsp;&nbsp;{{uplineData.country}}</p>
              </div>
              <div class="item-list">
                <p>Phone:</p>
                <p class="item-list-right">{{uplineData.phone}}</p>
              </div>
              <div class="item-list">
                <p>E-mail:</p>
                <p class="item-list-right">{{uplineData.email}}</p>
              </div>
            </div>
          </section>
          <section class="main-item">
            <p class="item-title">Your Sponsor</p>
            <div class="item-list-box">
              <div class="item-list">
                <p>Distributor ID：</p>
                <p class="item-list-right">{{sponsorData.membId || sponsorData.distributorId}}</p>
              </div>
              <div class="item-list">
                <p>Name：</p>
                <p class="item-list-right">{{sponsorData.name || sponsorData.distributorName}}</p>
              </div>
              <div class="item-list">
                <p>Address：</p>
                <p class="item-list-right">{{sponsorData.city}}&nbsp;&nbsp;{{sponsorData.country}}</p>
              </div>
              <div class="item-list">
                <p>Phone:</p>
                <p class="item-list-right">{{sponsorData.phone}}</p>
              </div>
              <div class="item-list">
                <p>E-mail:</p>
                <p class="item-list-right">{{sponsorData.email}}</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
    <!-- 收货地址弹窗 -->
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
              tag="section"
              class="form-item"
            >
              <div class="form-item-top">
                <label class="item-lable">*Country</label>
                <div class="item-main">
                  <select
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
              tag="section"
              class="form-item margin-l"
            >
              <div class="form-item-top">
                <label class="item-lable">*City</label>
                <div class="item-main">
                  <select class="item-main-inner" v-model="dialogParams.city">
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
              tag="section"
              class="form-item"
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
                    autofocus
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
            <ValidationProvider
              rules="required"
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
                    v-model.trim="dialogParams.firstName"
                  />
                </div>
              </div>
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item margin-l"
            >
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
                    v-model="dialogParams.phoneHead"
                    @change="phoneHeadChange"
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
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item margin-l"
            >
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
                <span ref="phoneBodyError" class="help-block">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
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
  distributorCustomer,
  distributorAddress,
  getAllCity,
  getAllCountry
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
      BASE_URL: BASE_URL,
      showDialog: false,
      showDialog1: false,
      showEditAddress: true,
      showMobileLoading: false,
      showToast: false,
      toastText: "",
      countryList: [],
      cityList: [],
      areaCodeArr: [],
      sponsorData: {},
      uplineData: {},
      addressData: {
        //页面地址对象
        firstName: "",
        lastName: "",
        phone: "",
        country: "",
        city: "",
        address: ""
      },
      dialogParams: {}, //弹窗地址对象
      distributorCard: {}, //页面经销商卡
      myDistributorId: "" //支付成功后生成的经销商id
    };
  },
  mounted() {
    const cityList = session.get("cityList");
    if (cityList) {
      this.cityList = cityList;
    }

    const areaCodeArr = session.get("areaCodeArr");
    if (areaCodeArr) {
      this.areaCodeArr = areaCodeArr;
    }

    this.getAllCountry();

    const distInformation = session.get("distInformation");
    if (distInformation) {
      const {
        firstName,
        lastName,
        phone,
        sponsor,
        upline,
        country,
        city
      } = distInformation;
      this.distributorCard.firstName = firstName;
      this.distributorCard.lastName = lastName;
      this.distributorCard.phone = phone;
      this.sponsorData = sponsor;
      this.uplineData = upline;
      this.addressData.country = country;
      this.addressData.city = city;
    }
    const addressInformation = session.get("addressInformation");
    if (addressInformation) {
      const {
        firstName,
        lastName,
        phone,
        phoneHead,
        phoneBody,
        country,
        city,
        address
      } = addressInformation;
      this.addressData.firstName = firstName;
      this.addressData.lastName = lastName;
      this.addressData.phone = phone;
      this.addressData.phoneHead = phoneHead;
      this.addressData.phoneBody = phoneBody;
      this.addressData.country = country;
      this.addressData.city = city;
      this.addressData.address = address;
      this.dialogParams = JSON.parse(JSON.stringify(this.addressData));
    }

    const myDistributorId = session.get("myDistributorId");
    if (myDistributorId) {
      this.myDistributorId = myDistributorId;
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
      }
    },
    // 获取选中国家下面所有的城市
    async getAllCity(areaCode) {
      let res = await getAllCity(areaCode);
      const rescode = res.code;
      if (rescode === 0) {
        const resdata = res.data;
        this.cityList = resdata;
      }
    },
    // 获取顾客信息
    async distributorCustomer() {
      const id = session.get("customerInfo");
      let res = await distributorCustomer({ id });
      const rescode = res.code;
      if (rescode === 0) {
        const resData = res.data;
        this.sponsorData = resData.sponsor;
        this.uplineData = resData.upline;
        this.dialogParams.firstName = resData.firstName;
        this.dialogParams.lastName = resData.lastName;
        this.dialogParams.phone = resData.phone;
        this.dialogParams.country = resData.country;
        this.dialogParams.address = resData.city;
      }
    },
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.showToast = true;
        this.toastText = "Please check required";
        return;
      }
      this.showMobileLoading = true;
      this.submitAddress();
    },
    // 提交地址信息
    async submitAddress() {
      const reqData = Object.assign({}, this.dialogParams);
      delete reqData.phone;
      reqData.phone = reqData.phoneHead + reqData.phoneBody;
      if (this.myDistributorId) {
        reqData.distributorNo = this.myDistributorId;
      }
      let res = await distributorAddress(reqData);
      this.showMobileLoading = false;
      const rescode = res.code;
      if (rescode === 0) {
        session.set("addressInformation", reqData);
        this.addressData = reqData;
        this.showDialog = false;
      }
      if (rescode === 101) {
        if (this.BASE_URL === "http://172.18.1.240:73") {
          this.showToast = true;
          this.toastText = res.fullMessage;
          this.showDialog = false;
        } else {
          console.error(res.fullMessage);
        }
      }
    },
    phoneHeadChange() {
      this.dialogParams.phoneBody = "";
    },
    phoneBodyInput(event) {
      let value = event.target.value;
      value = value.replace(/\D/g, "");
      let numberLength;
      let phoneHead = this.dialogParams.phoneHead;
      const nineList = ["254", "255", "256", "264", "233", "237", "229"];
      if (nineList.includes(phoneHead)) {
        numberLength = 9;
      }
      if (phoneHead === "234") {
        numberLength = 10;
      }
      if (value.length >= numberLength) {
        value = value.slice(0, numberLength);
        this.$refs.phoneBodyError.innerHTML = "";
      } else {
        const arr = nineList;
        arr.push("234");
        if (!arr.includes(phoneHead)) {
          this.$refs.phoneBodyError.innerHTML = "";
        } else {
          this.$refs.phoneBodyError.innerHTML = "Format Error";
        }
      }
      this.dialogParams.phoneBody = value;
    },
    dialogHandle(flag) {
      if (flag) {
        this.onSubmit();
      } else {
        this.showDialog = false;
      }
    },
    dialogHandle1(flag) {
      if (flag) {
        session.clear();
        location.href = BASE_URL;
      } else {
        this.showDialog1 = false;
      }
    },
    handleExit() {
      this.showDialog1 = true;
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
          session.set("areaCode", areaCode);
        }
      }
    }
  },
  components: {
    "my-header": myHeader,
    "my-step": myStep,
    "my-toast": myToast,
    "mobile-loading": mobileLoading,
    "my-dialog": myDialog,
    SumaHeader
  }
};
</script>

<style scoped lang="stylus">
@import '../../../../static/stylus/common.styl'

#business-cont
  margin-top 132px
  @media (max-width: 980px)
    margin-top 50px
  .business-mid
    padding 20px
    background #fff
    margin 20 0 38px 0
    @media (max-width: 980px)
      padding 8px
      margin 0
    .md-item
      padding 10px 0
      &:not(:last-child)
        border-bottom 1px solid #C2C2C2
        @media (max-width: 980px)
          border-bottom none
          border-1px-b(#ccc)
      &:first-child
        padding-top 0
      .item-title
        display flex
        justify-content space-between
        line-height 30px
        font-weight bold
        @media (max-width: 980px)
          line-height 1.5
        .btn
          font-weight bold
          font-size 15px
          color #5BA2CC
      .blue
        color #5BA2CC
      .red
        color rgba(201, 56, 115, 1)
      .item-content
        margin 8px 16px
      .content-list
        display flex
        @media (max-width: 980px)
          display block
        .main-item
          flex 1
          &:not(:first-child)
            padding-left 26px
            @media (max-width: 980px)
              padding-left 0
              margin-top 20px
          &::before
            position absolute
            content ''
            display inline-block
            width 8px
            height 20px
            margin-right 20px
            transform translateY(4px)
            background-color rgba(139, 195, 113, 1)
            &:nth-child(1)
              margin-left -26px
          .item-desc
            line-height 20px
          .item-title
            line-height 30px
            padding-left 26px
            @media (max-width: 980px)
              padding-left 16px
            &.head
              line-height 20px
              margin-top 6px
          .item-img
            margin-top 10px
            max-width 100%
          .item-text
            line-height 30px
          .item-list-box
            padding-left 26px
            margin-top 4px
            border-left 1px solid #c2c2c2
            @media (max-width: 980px)
              border-left none
            .item-list
              .item-list-right
                text-align right
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
