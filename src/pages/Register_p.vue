<template>
  <div class="page-cont">
    <header class="header">
      <p class="header-title">Become a Distributor</p>
      <p class="header-crumbs">You are here：Home / Register</p>
    </header>
    <section class="step">
      <img src="../../static/img/country_sponsor.png" alt />
    </section>
    <form action="/" class="form">
      <p class="form-tips">
        You are now taking your first steps to becoming a BF Suma Distributor.
        <br />Begin the registration process by selecting a country and your sponsor below：
      </p>
      <p class="required-title">*Required</p>
      <div class="checkbox">
        <p class="checkbox-title">* I am at least 18 years old |</p>
        <div class="checkbox-radio">
          <input type="radio" name="flag" id="yes" checked />
          <label for="yes">Yes</label>
          <input class="radio-right" type="radio" name="flag" id="no" />
          <label for="no">No</label>
        </div>
      </div>
      <div class="form-items">
        <div class="form-item">
          <label class="item-title">*Country</label>
          <select
            class="item-select"
            name="country"
            id="country"
            v-model="formParams.country"
            required
          >
            <option value disabled selected>Select your option</option>
            <option
              :value="country.id"
              v-for="(country,index) in countryList"
              :key="index"
            >{{country.name}}</option>
          </select>
        </div>
        <div class="form-item">
          <label class="item-title">*City</label>
          <select class="item-select" name="city" id="city" v-model="formParams.city">
            <option
              :value="country.id"
              v-for="(country,index) in countryList"
              :key="index"
            >{{country.name}}</option>
          </select>
        </div>
      </div>
      <hr style="margin: 10px;color:#eee" />
      <!-- click connect -->
      <div v-show="isConnected">
        <div class="form-items">
          <div class="form-item">
            <label class="item-title input">*Sponsor</label>
            <p>
              Gage get
              (ID:{{currentSponsor.distributorId}} Gender:{{currentSponsor.gender}} Mobile Number:{{currentSponsor.phone}} E-mail:{{currentSponsor.email}})
            </p>
          </div>
        </div>
        <div class="form-items">
          <div class="form-item">
            <label class="item-title input">*Upline</label>
            <p>
              Gage get
              (ID:{{currentSponsor.distributorId}} Gender:{{currentSponsor.gender}} Mobile Number:{{currentSponsor.phone}} E-mail:{{currentSponsor.email}})
            </p>
          </div>
        </div>
        <div class="connect-foot">
          <p>Or you want to modify your Upline</p>
          <input
            type="text"
            placeholder="*Fill in you Upline Distributor Id or Mobile Phone or E-mail that you know"
          />
          <button>search</button>
        </div>
      </div>
      <!-- system-recommend -->
      <div class="system-recommend" v-show="showrecommendBtn">
        <p>Can't find who you're looking for or don't know any distributor?</p>
        <img src="../../static/img/become.png" alt />
      </div>
      <div class="recommend-list" v-show="!showrecommendBtn">
        <p>
          We can recommend
          <span>3</span> matches for you to choose from
        </p>
        <table class="table">
          <thead border="1">
            <tr>
              <th>Distributor Name</th>
              <th>Distributor ID</th>
              <th>Gender</th>
              <th>City</th>
              <th>Mobile Number</th>
              <th>E-mail</th>
              <th>Connect</th>
            </tr>
          </thead>

          <tbody class="custom" style="margin-top: 20px;">
            <tr v-for="(recommend ,index) in recommendList" :key="index">
              <td>{{recommend.distributorName}}</td>
              <td style="backgroundColor:#DCDCDC">{{recommend.distributorId}}</td>
              <td>{{recommend.gender}}</td>
              <td>{{recommend.city}}</td>
              <td>{{recommend.phone}}</td>
              <td>{{recommend.email}}</td>
              <td>
                <button type="button" class="connect-btn" @click="connectHandle(recommend)">Connect</button>
              </td>
            </tr>
          </tbody>
          <tbody class="upline_custom" style="margin-top: 20px;"></tbody>
        </table>
      </div>
      <div class="next-btn-wrap">
        <button class="next-btn">Next</button>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
import { sponsorRecommend, getAllCountry, searchSponsor } from "@/api/index";
import { Checkbox } from "vant";
import myDialog from "@/components/my-dialog";

export default {
  data() {
    return {
      checked: true,
      showDialog: false,
      showNoData: false,
      showrecommendBtn: true,
      isConnected: false,
      currentStep: 0,
      currentSponsor: {},
      formParams: {
        country: "Kenya",
        city: "NAIROBI",
        sponsor: ""
      },
      recommendList: [],
      countryList: [
        {
          name: "aa"
        },
        {
          name: "bb"
        },
        {
          name: "cc"
        },
        {
          name: "dd"
        }
      ]
    };
  },
  computed: {
    disabled() {
      if (
        !this.formParams.country ||
        !this.formParams.city ||
        !this.formParams.sponsor.trim()
      )
        return true;
    }
  },
  mounted() {
    // this.getAllCountry();
    this.getRecommend();
  },
  methods: {
    toggleChecked() {
      this.showDialog = true;
    },
    onConfirm() {
      this.showDialog = false;
      this.checked = true;
    },
    onCancel() {
      this.showDialog = false;
      this.$router.push("/login");
    },
    async searchSponsor() {
      let res = await searchSponsor();
    },
    async getRecommend() {
      let res = await sponsorRecommend(
        this.formParams.country,
        this.formParams.city
      );
      this.recommendList = res.data;
      console.log("city", this.recommendList);

      if (!this.recommendList.length) {
        this.showNoData = true;
      } else {
        this.showrecommendBtn = false;
      }
    },
    async getAllCountry() {
      let res = await getAllCountry();
      this.countryList = res.data;
    },
    connectHandle(item) {
      this.isConnected = true;
      this.currentSponsor = item;
      this.showrecommendBtn = true;
    },

    submitHandle() {
      console.log(this.formParams);
    }
  },
  components: {
    "van-checkbox": Checkbox,
    "my-dialog": myDialog
  }
};
</script>

<style scoped lang="stylus">
.page-cont
  .header
    display flex
    justify-content space-between
    margin-top 32px
    .header-title
      font-size 36px
      font-family PingFang-SC-Bold, PingFang-SC
      color #5BA2CC
      line-height 50px
    .header-crumbs
      font-family PingFang-SC-Bold, PingFang-SC
      color #9A9A9A
      line-height 50px
  .step
    margin-top 10px
    background-color #fff
    text-align center
    img
      width 1100px
      height 44px
      padding 10px
  .form
    margin-top 20px
    background-color #fff
    .form-tips
      padding 12px
      font-size 14px
      font-family PingFang-SC-Bold, PingFang-SC
      font-weight bold
      color #575757
      line-height 30px
    .required-title
      margin 12px 0 0 12px
      color #5BA2CC
    .checkbox
      display flex
      margin-left 20px
      margin-top 30px
      .checkbox-title
        color #4295C5
        font-weight bold
      .checkbox-radio
        margin-left 30px
        label
          color #4295C5
        .radio-right
          margin-left 40px
    .form-items
      display flex
      margin 0 8px
      .form-item
        flex 1
        display flex
        position relative
        // width 524px
        line-height 40px
        margin 12px
        background-color #E6F0F3
        p
          margin-left 20px
          line-height 50px
        .item-title
          font-weight bold
          border-right 1px solid #BABABA
          color #4295C5
          margin-left 20px
          padding-right 10px
          &.input
            line-height 50px
        .item-select
          width 100%
          &.input
            height 50px
            text-indent 20px
      .form-btn
        width 90px
        background #5ba2cc
        color #fff
        border-radius 4px
        height 50px
        line-height 50px
        margin-top 12px
        margin-right 10px
    .connect-foot
      display flex
      justify-content space-between
      margin 0 20px
      input
        flex 1
        margin-left 20px
        border-radius 4px
        text-indent 20px
        border 1px solid #ccc
      button
        margin-left 20px
        color #fff
        border-radius 4px
        padding 6px 12px
        background-color #5ba2cc
    .system-recommend
      text-align center
      p
        color #575757
        font-size 26px
        margin-top 114px
      img
        margin 50px auto
        width 290px
        cursor pointer
    .recommend-list
      margin 12px
      p
        span
          color #5BA2CC
      .table
        text-align center
        width 100%
        margin-top 30px
        thead
          border-bottom 1px solid #eee
          tr
            border-bottom 1px solid red
        tbody
          tr
            height 70px
            background-color #F3F3F3
            border-top 10px solid #fff
            .connect-btn
              color #fff
              padding 8px 18px
              border-radius 4px
              background-color #55ABD9
    .next-btn-wrap
      text-align right
      .next-btn
        margin 20px
        color #fff
        width 124px
        height 48px
        background #5ba2cc
        border unset
        cursor pointer
        border-radius 4px
</style>
