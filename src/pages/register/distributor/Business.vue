<template>
  <div id="business-cont">
    <my-header />
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
          >Add Shipping Address</button>
        </p>
        <div class="item-content">
          <p>{{firstName}} {{lastName}} {{phone}}</p>
          <p>{{address}} {{city}} {{country}}</p>
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
                <p class="item-list-right">{{uplineData.distributorId}}</p>
              </div>
              <div class="item-list">
                <p>Name：</p>
                <p class="item-list-right">{{firstName}}&nbsp;&nbsp;{{lastName}}</p>
              </div>
              <div class="item-list">
                <p>Phone:</p>
                <p class="item-list-right">{{phone}}</p>
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
                <p class="item-list-right">{{city}}&nbsp;&nbsp;{{country}}</p>
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
                <p class="item-list-right">{{city}}&nbsp;&nbsp;{{country}}</p>
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
                    v-model="dialogParams.firstName"
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
              class="form-item"
              style="margin-left:16px"
            >
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
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item"
              style="margin-left:16px"
            >
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
              tag="section"
              class="form-item"
            >
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
            <!-- city -->
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item"
              style="margin-left:16px"
            >
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
          </div>
        </ValidationObserver>
      </div>
    </my-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { distributorCustomer, distributorAddress } from "@/api/index";
import myHeader from "@/components/my-header";
import myStep from "@/components/my-step";
import myToast from "@/components/my-toast";
import myDialog from "@/components/my-dialog";
export default {
  data() {
    return {
      showDialog: false,
      showEditAddress: true,
      firstName: "",
      lastName: "",
      phone: "",
      country: "",
      city: "",
      address: "",
      countryList: [],
      dialogParams: {},
      sponsorData: {},
      uplineData: {}
    };
  },
  computed: {
    phoneHead() {
      return this.phone.slice(0, 3);
    },
    phoneBody() {
      return this.phone.slice(3);
    }
  },
  mounted() {
    let sponsorData = JSON.parse(sessionStorage.getItem("sponsorData"));
    let uplineData = JSON.parse(sessionStorage.getItem("uplineData"));
    let addressInformation = JSON.parse(
      sessionStorage.getItem("addressInformation")
    );
    let countryList = JSON.parse(sessionStorage.getItem("countryList"));
    if (sponsorData) {
      this.sponsorData = sponsorData;
    }
    if (uplineData) {
      this.uplineData = uplineData;
    }
    if (addressInformation) {
      this.showEditAddress = true;
      const {
        firstName,
        lastName,
        phone,
        country,
        city,
        address
      } = addressInformation;
      this.firstName = firstName;
      this.dialogParams.firstName = firstName;
      this.lastName = lastName;
      this.dialogParams.lastName = lastName;
      this.phone = phone;
      this.dialogParams.phone = phone;
      this.dialogParams.phoneHead = phone.slice(0, 3);
      this.dialogParams.phoneBody = phone.slice(3);
      this.country = country;
      this.dialogParams.country = country;
      this.city = city;
      this.dialogParams.city = city;
      this.address = address;
      this.dialogParams.address = address;
    } else {
      this.showEditAddress = false;
    }
    if (countryList) {
      this.countryList = countryList;
    }
    this.$nextTick(() => {
      this.distributorCustomer();
    });
  },
  methods: {
    async distributorCustomer() {
      const id = sessionStorage.getItem("customerInfo");
      let res = await distributorCustomer({ id });
      const rescode = res.code;
      if (rescode === 0) {
        const resData = res.data;
        this.sponsorData = resData.sponsor;
        this.uplineData = resData.upline;
        this.firstName = resData.firstName;
        this.lastName = resData.lastName;
        this.phone = resData.phone;
        this.country = resData.country;
        this.address = resData.city;
      }
    },
    async submitAddress() {
      let reqData = Object.assign({}, this.dialogParams);
      let user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        reqData.distributorNo = user.distributorId;
      }
      console.log(reqData);
      delete reqData.phoneHead;
      delete reqData.phoneBody;

      let res = await distributorAddress(reqData);
      if (!res) {
        console.error(res.fullMessage);
      } else {
        const rescode = res.code;
        if (rescode === 0) {
          this.showDialog = false;
        }
        if (rescode === 101) {
          console.error(res.fullMessage);
        }
      }
    },
    dialogHandle(flag) {
      if (!flag) {
        this.showDialog = false;
      } else {
        this.submitAddress();
      }
    }
  },
  components: {
    "my-header": myHeader,
    "my-step": myStep,
    "my-toast": myToast,
    "my-dialog": myDialog
  }
};
</script>

<style scoped lang="stylus">
#business-cont
  .business-mid
    padding 20px
    background #fff
    margin 20 0 38px 0
    @media (max-width: 980px)
      margin 0
    .md-item
      padding 10px 0
      &:not(:last-child)
        border-bottom 1px solid #C2C2C2
      &:first-child
        padding-top 0
      .item-title
        display flex
        justify-content space-between
        line-height 30px
        font-weight bold
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
              // padding-left 0
              border-left none
            .item-list
              .item-list-right
                text-align right
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
            margin-left 0
            border-right none
            height 30px
            line-height 6px
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
</style>
