<template>
  <div class="country-cont">
    <my-header />
    <my-step>
      <img src="../../static/img/country_sponsor.png" alt />
    </my-step>
    <form action="/" class="form" @submit.prevent="submitHandle">
      <my-required>
        You are now taking your first steps to becoming a BF Suma Distributor.
        <br />Begin the registration process by selecting a country and your sponsor below：
      </my-required>
      <div class="checkbox">
        <label class="checkbox-label">* I am at least 18 years old</label>
        <div class="checkbox-radio">
          <div class="radio-item">
            <input ref="input" type="radio" name="flag" id="yes" checked />
            <img class="checked-img" src="../../static/img/checked.png" alt />
            <label for="yes">Yes</label>
          </div>
          <div class="radio-item" @click="showDialog=true">
            <input type="radio" name="flag" id="no" />
            <img class="checked-img" src="../../static/img/checked.png" alt />
            <label for="no">No</label>
          </div>
        </div>
      </div>
      <!-- 年龄不足18的弹框 -->
      <div class="dialog-eighteen" v-if="showDialog">
        <div class="dialog-main">
          <h2>Minor reminder</h2>
          <div class="dialog-main-text">
            <p>Sorry,you can’t be a distributor of BF Suma if you are under 18 years old.</p>
            <p>But you can recommend relative or neighbor around you who is over 18 to become distributors of BFSuma!</p>
            <p>If you are over 16, you can try our products.</p>
          </div>
          <a href="http://www.bfsuma.com/products/en">Now，have a look at the product！</a>
          <div class="dialog-buttons">
            <div class="buttons-item">
              <button class="btn btn-cancel" @click.prevent="dialogHandle">Cancel</button>
            </div>
            <div class="buttons-item">
              <button class="btn btn-confirm" @click.prevent="dialogHandle">Confirm</button>
            </div>
          </div>
        </div>
      </div>
      <div class="form-items">
        <div class="form-item">
          <label class="item-lable">*Country</label>
          <select
            class="item-select"
            name="country"
            id="country"
            v-model="formParams.country"
            required
          >
            <!-- <option value="Select gender">Select gender</option> -->
            <option
              :value="country.id"
              v-for="(country,index) in countryList"
              :key="index"
            >{{country.name}}</option>
          </select>
        </div>
        <div class="form-item">
          <label class="item-lable">*City</label>
          <select class="item-select" name="city" id="city" v-model="formParams.city" required>
            <option
              :value="country.id"
              v-for="(country,index) in countryList"
              :key="index"
            >{{country.name}}</option>
          </select>
        </div>
      </div>
      <hr style="margin: 10px;color:#eee" />
      <!-- *Sponsor -->
      <div class="form-items sponsor" v-show="!isConnected">
        <div class="form-item">
          <label class="item-lable">*Sponsor</label>
          <input
            type="text"
            placeholder="*Fill in you Upline Distributor Id or Mobile Phone or E-mail that you know"
            v-model="formParams.sponsor"
          />
        </div>
        <button
          class="sponsor-searchbtn"
          :class="{'disable':canSearch}"
          @click="searchSponsor"
          :disabled="canSearch"
        >Search</button>
      </div>
      <!-- click connect -->
      <div v-show="isConnected">
        <div class="form-items">
          <div class="form-item">
            <label class="item-lable input">*Sponsor</label>
            <p>
              Gage get
              (ID:{{currentSponsor.distributorId}} Gender:{{currentSponsor.gender}} Mobile Number:{{currentSponsor.phone}} E-mail:{{currentSponsor.email}})
            </p>
          </div>
        </div>
        <div class="form-items">
          <div class="form-item">
            <label class="item-lable input">*Upline</label>
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
            v-model="formParams.sponsor"
          />
          <button @click="searchSponsor" :class="{'disable':canSearch}" :disabled="canSearch">Search</button>
        </div>
      </div>
      <!-- system-recommend -->
      <div class="system-recommend" v-show="showrecommendBtn">
        <p>Can't find who you're looking for or don't know any distributor?</p>
        <img @click="getRecommend" src="../../static/img/become.png" alt />
      </div>
      <div class="recommend-list" v-show="!showrecommendBtn">
        <p class="tableTips" v-show="tableTips">
          We can recommend
          <span>{{recommendList.length}}</span> matches for you to choose from
        </p>
        <p class="tableTips" v-show="!tableTips">
          We found
          <span>{{recommendList.length}}</span> matches based on your search
        </p>
        <table class="table">
          <thead>
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

          <tbody>
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
        </table>
      </div>
      <div class="next-btn-wrap" @click="$router.push('/PersonalInformation_p')">
        <button class="next-btn">Next</button>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
import { sponsorRecommend, getAllCountry, searchSponsor } from "@/api/index";
import { Checkbox } from "vant";
import myDialog from "@/components/my-dialog";
import myHeader from "@/components/my-header";
import myRequired from "@/components/my-required";
import myStep from "@/components/my-step";

export default {
  data() {
    return {
      checked: true,
      showDialog: false,
      showNoData: false,
      showrecommendBtn: true,
      isConnected: false,
      tableTips: false,
      currentStep: 0,
      currentSponsor: {},
      formParams: {
        country: "Kenya",
        city: "NAIROBI",
        sponsor: "KE220228"
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
    },
    canSearch() {
      if (!this.formParams.sponsor.trim()) return true;
    }
  },
  mounted() {
    // this.getAllCountry();
    // this.getRecommend();
  },
  methods: {
    dialogHandle() {
      this.showDialog = !this.showDialog;
      this.$refs.input.checked = true;
    },
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
      let res = await searchSponsor(
        this.formParams.country,
        this.formParams.city,
        this.formParams.sponsor,
        1,
        1573693207826
      );
      console.log(res);
      this.recommendList = res.list;
      if (!this.recommendList.length) {
        this.showNoData = true;
      } else {
        this.showrecommendBtn = false;
      }
      this.tableTips = false;
    },
    async getRecommend() {
      let res = await sponsorRecommend(
        this.formParams.country,
        this.formParams.city
      );
      this.recommendList = res.data;

      if (!this.recommendList.length) {
        this.showNoData = true;
      } else {
        this.showrecommendBtn = false;
      }
      this.tableTips = true;
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
    "my-dialog": myDialog,
    "my-header": myHeader,
    "my-required": myRequired,
    "my-step": myStep
  }
};
</script>

<style scoped lang="stylus">
@import '../../static/stylus/pc'

.country-cont
  .form
    margin-top 20px
    padding 20px
    background-color #fff
    .checkbox
      display flex
      margin-left 20px
      margin-top 30px
      .checkbox-label
        color #4295C5
        font-weight bold
      .checkbox-radio
        display flex
        margin-left 20px
        .radio-item
          position relative
          display flex
          margin-left 20px
          input
            display none
            &:checked+img
              opacity 1
          img
            opacity 0
            position absolute
            top 50%
            transform translateY(-50%)
            width 18px
          label
            color #4295C5
            cursor pointer
            margin-left 20px
            border-right none
            font-weight normal
            &::before
              position absolute
              left 0
              top 50%
              transform translateY(-50%)
              content ''
              display block
              width 11px
              height 11px
              border-radius 50%
              border 1px solid #666
    .dialog-eighteen
      position absolute
      top 0
      left 0
      width 100vw
      height 100vh
      text-align center
      background-color rgba(0, 0, 0, 0.3)
      padding-top 100px
      .dialog-main
        background-color #fff
        display inline-block
        border-radius 10px
        text-align left
        padding 50px
        font-weight bold
        h2
          color #56a7d8
          text-align center
        .dialog-main-text
          margin-top 30px
          p
            font-size 16px
            color #696969
            line-height 32px
        a
          display block
          margin-top 20px
          font-size 16px
          color #56a7d8
        .dialog-buttons
          margin-top 40px
          display flex
          .buttons-item
            flex 1
            text-align center
            .btn
              font-weight bold
              font-size 16px
              width 140px
              padding 20px
              color #fff
              border-radius 4px
            .btn-cancel
              background-color #ddd
            .btn-confirm
              background-color #56a7d8
    .form-items
      display flex
      margin 0 8px
      .form-item
        flex 1
        display flex
        // position relative
        line-height 40px
        margin 12px 20px
        background-color #E6F0F3
        p
          margin-left 20px
          line-height 50px
        .item-lable
          font-weight bold
          border-right 1px solid #BABABA
          color #4295C5
          margin-left 20px
          padding-right 10px
          &.input
            line-height 50px
        .item-select
          width 100%
          color rgb(87, 87, 87)
          padding-left 10px
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
      &.sponsor
        .form-item
          line-height 50px
          input
            width 100%
            text-indent 20px
        .sponsor-searchbtn
          margin 12px 10px 0 10px
          padding 0 20px
          color #fff
          border-radius 4px
          height 40px
          line-height 40px
          background-color #5ba2cc
          &.disable
            filter grayscale(1)
            cursor not-allowed
    .connect-foot
      display flex
      justify-content space-between
      margin 0 20px
      line-height 40px
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
        &.disable
          filter grayscale(1)
          cursor not-allowed
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
      margin-top 30px
      text-align right
      .next-btn
        color #fff
        width 124px
        height 48px
        background #5ba2cc
        border unset
        cursor pointer
        border-radius 4px
</style>
