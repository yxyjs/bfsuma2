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
          <select class="item-select" v-model="country">
            <option disabled value style="display:none;">Fill in the city</option>
            <option
              :value="country.value"
              v-for="(country,index) in countryList"
              :key="index"
            >{{country.text}}</option>
          </select>
        </div>
        <div class="form-item">
          <label class="item-lable">*City</label>
          <select class="item-select" v-model="city">
            <option disabled value style="display:none;">Select Registrant’s Country</option>
            <option
              :value="country.value"
              v-for="(country,index) in countryList"
              :key="index"
            >{{country.text}}</option>
          </select>
        </div>
      </div>
      <hr class="hr" />
      <!-- *Sponsor -->
      <div class="form-items" v-show="!isConnected">
        <div class="form-item">
          <label class="item-lable">*Sponsor</label>
          <div class="item-inputs">
            <input
              type="text"
              placeholder="*Upline Distributor Id or Mobile Phone or E-mail"
              v-model="sponsor"
            />
            <button
              class="sponsor-searchbtn"
              :class="{'disable':canSearch}"
              @click="searchSponsor"
              :disabled="canSearch"
            >Search</button>
          </div>
        </div>
      </div>
      <!-- click connect -->
      <div v-show="isConnected">
        <div class="form-items">
          <div class="form-item">
            <label class="item-lable input">*Sponsor</label>
            <div class="item-text">
              Gage get
              <span>
                <strong>ID:</strong>
                {{currentSponsor.distributorId}}
              </span>
              <span>
                <strong>Gender:</strong>
                {{currentSponsor.gender}}
              </span>
              <span>
                <strong>Mobile Number:</strong>
                {{currentSponsor.phone}}
              </span>
              <span>
                <strong>E-mail:</strong>
                {{currentSponsor.email}}
              </span>
            </div>
          </div>
        </div>
        <div class="form-items">
          <div class="form-item">
            <label class="item-lable input">*Upline</label>
            <div class="item-text">
              Gage get
              <span>
                <strong>ID:</strong>
                {{currentSponsor.distributorId}}
              </span>
              <span>
                <strong>Gender:</strong>
                {{currentSponsor.gender}}
              </span>
              <span>
                <strong>Mobile Number:</strong>
                {{currentSponsor.phone}}
              </span>
              <span>
                <strong>E-mail:</strong>
                {{currentSponsor.email}}
              </span>
            </div>
          </div>
        </div>
        <div class="connect-foot">
          <p>Or you want to modify your Upline</p>
          <div class="connect-foot-main">
            <input
              type="text"
              placeholder="*Fill in you Upline Distributor Id or Mobile Phone or E-mail that you know"
              v-model="sponsor"
            />
            <button
              @click="searchSponsor"
              :class="{'disable':canSearch}"
              :disabled="canSearch"
            >Search</button>
          </div>
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
        <div class="table-wrap">
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
                  <button
                    type="button"
                    class="connect-btn"
                    @click="connectHandle(recommend)"
                  >Connect</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="next-btn-wrap">
        <button class="next-btn" @click="nextHandle">Next</button>
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
      // country: "Kenya",
      country: "",
      // city: "NAIROBI",
      city: "",
      // sponsor: "KE220228",
      sponsor: "",
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
      recommendList: []
    };
  },
  computed: {
    disabled() {
      if (!this.country || !this.city || !this.sponsor.trim()) return true;
    },
    canSearch() {
      if (!this.sponsor.trim()) return true;
    }
  },
  mounted() {
    // this.getAllCountry();
    this.getRecommend();
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
        this.country,
        this.city,
        this.sponsor,
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
      let res = await sponsorRecommend(this.country, this.city);
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
      console.log(this);
    },
    nextHandle() {
      // if (!this.city) {

      // }
      this.$router.push("/PersonalInformation");
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

::placeholder
  // font-size 1
  letter-spacing -0.4px
.country-cont
  .form
    margin-top 20px
    padding 20px
    background-color #fff
    min-height 100vh
    @media (max-width: 980px)
      margin-top 0
      padding 8px
    .checkbox
      display flex
      margin-left 20px
      margin-top 30px
      @media (max-width: 980px)
        margin 10px 0 0 5px
      .checkbox-label
        color #4295C5
        font-weight bold
      .checkbox-radio
        display flex
        margin-left 20px
        @media (max-width: 980px)
          margin-left 0
        .radio-item
          position relative
          display flex
          margin-left 20px
          @media (max-width: 980px)
            margin-left 10px
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
      @media (max-width: 980px)
        background-color rgba(0, 0, 0, 0.5)
      .dialog-main
        background-color #fff
        display inline-block
        border-radius 10px
        text-align left
        font-weight bold
        width 60%
        font-size 16px
        @media (max-width: 980px)
          font-size 12px
          width 90%
          overflow hidden
        h2
          color #56a7d8
          text-align center
          margin-top 30px
        .dialog-main-text
          margin 30px 0 0 30px
          @media (max-width: 980px)
            margin 10px 0 0 10px
          p
            color #696969
            line-height 32px
            @media (max-width: 980px)
              line-height 1.5
              margin-top 10px
        a
          display block
          margin 30px 0 0 30px
          color #56a7d8
          @media (max-width: 980px)
            margin 10px 0 0 10px
        .dialog-buttons
          margin 30px
          @media (max-width: 980px)
            margin 20px 0 0 0
          display flex
          .buttons-item
            flex 1
            text-align center
            .btn
              font-weight bold
              width 140px
              padding 20px
              color #fff
              border-radius 4px
              @media (max-width: 980px)
                width 100%
                border-radius 0
            .btn-cancel
              background-color #ddd
            .btn-confirm
              background-color #56a7d8
    .form-items
      display flex
      margin 0 8px
      @media (max-width: 980px)
        display block
        margin 0
      .form-item
        flex 1
        display flex
        margin 12px 20px
        background-color #E6F0F3
        @media (max-width: 980px)
          margin 12px 0
          background-color #fff
          flex-direction column
        .item-text
          margin-left 20px
          @media (max-width: 980px)
            line-height 24px
            span
              display block
        .item-lable
          font-weight bold
          border-right 1px solid #BABABA
          color #4295C5
          margin-left 20px
          padding-right 10px
          @media (max-width: 980px)
            margin-left 0
            border-right none
        .item-select
          width 100%
          color rgb(87, 87, 87)
          padding-left 10px
          @media (max-width: 980px)
            line-height 36px
            background-color #E6F0F3
            border-radius 4px
            margin-top 4px
          &.input
            height 50px
            text-indent 20px
            @media (max-width: 980px)
              text-indent 0px
        .item-inputs
          flex 1
          display flex
          justify-content space-between
          @media (max-width: 980px)
            padding-top 4px
          input
            flex 1
            padding 10px 0
            background-color #E6F0F3
          .sponsor-searchbtn
            color #fff
            background-color #5ba2cc
            border-radius 4px
            padding 0 8px
            // border-left 16px solid #fff
      .form-btn
        width 90px
        background #5ba2cc
        color #fff
        border-radius 4px
        height 50px
        line-height 50px
        margin-top 12px
        margin-right 10px
    .hr
      margin 10px
      color #eee
      @media (max-width: 980px)
        display none
    .connect-foot
      display flex
      justify-content space-between
      margin 0 20px
      line-height 40px
      @media (max-width: 980px)
        display block
        margin 0
        line-height 30px
      .connect-foot-main
        flex 1
        display flex
        input
          flex 1
          margin-left 20px
          border-radius 4px
          text-indent 20px
          @media (max-width: 980px)
            margin-left 0
            text-indent 10px
        button
          margin-left 20px
          color #fff
          border-radius 4px
          padding 6px 12px
          background-color #5ba2cc
          @media (max-width: 980px)
            margin-left 4px
            padding 6px
          &.disable
            filter grayscale(1)
            cursor not-allowed
    .system-recommend
      text-align center
      p
        color #575757
        font-size 26px
        margin-top 114px
        @media (max-width: 980px)
          font-size 14px
          margin-top 54px
      img
        margin 50px auto
        width 290px
        cursor pointer
        @media (max-width: 980px)
          width 190px
          margin 20px auto
    .recommend-list
      margin 12px
      @media (max-width: 980px)
        margin 0
      p
        span
          color #5BA2CC
      .table-wrap
        @media (max-width: 980px)
          width 'cale(100vw - %s)' 5px
          overflow auto
          white-space nowrap
        .table
          text-align center
          width 100%
          margin-top 30px
          thead
            border-bottom 1px solid #eee
            tr
              border-bottom 1px solid red
              th
                @media (max-width: 980px)
                  padding 0 4px
          tbody
            tr
              height 70px
              background-color #F3F3F3
              border-top 10px solid #fff
              @media (max-width: 980px)
                height 30px
                border-top none
              td
                @media (max-width: 980px)
                  border 1px solid #ccc
                .connect-btn
                  color #fff
                  padding 8px 18px
                  border-radius 4px
                  background-color #55ABD9
                  @media (max-width: 980px)
                    padding 2px 3px
                    font-size 12px
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
        @media (max-width: 980px)
          width 100%
          font-size 16px
</style>
