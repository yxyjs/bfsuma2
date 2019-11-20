<template>
  <div id="country-cont">
    <my-header />
    <my-step>
      <img src="../../static/img/country_sponsor.png" alt />
    </my-step>
    <form action="/" class="form" @submit.prevent="submitHandle">
      <p class="top-tips">
        You are now taking your first steps to becoming a BF Suma Distributor.
        <br />Begin the registration process by selecting a country and your sponsor below：
      </p>
      <p class="required">*Required</p>
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
      <div class="form-wrap">
        <!-- country -->
        <section>
          <div class="form-wrap-box">
            <section class="form-item">
              <div class="form-item-top">
                <label class="item-lable">*Country</label>
                <div class="item-main">
                  <select
                    class="item-main-inner"
                    v-model="formParams.country"
                    :class="showHelpBlock ? 'show-help' : ''"
                    @input="selectChange"
                  >
                    <option disabled value style="display:none;">Select Registrant’s Country</option>
                    <option
                      :value="country.value"
                      v-for="(country,index) in countryList"
                      :key="index"
                    >{{country.text}}</option>
                  </select>
                </div>
              </div>
              <div class="form-item-bottom">
                <small ref="showHelpBlock" class="help-block" v-show="showHelpBlock">Required</small>
              </div>
            </section>
            <section class="form-item margin-l">
              <div class="form-item-top">
                <label class="item-lable">*City</label>
                <div class="item-main">
                  <select
                    class="item-main-inner"
                    v-model="formParams.city"
                    :class="showHelpBlock1 ? 'show-help' : ''"
                    @input="selectChange"
                  >
                    <option disabled value style="display:none;">Fill in the city</option>
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
              <!-- smallhelp -->
              <div class="form-item-bottom">
                <small ref="showHelpBlock1" class="help-block" v-show="showHelpBlock1">Required</small>
              </div>
            </section>
          </div>
        </section>
      </div>
      <hr class="hr" />
      <!-- click connect -->
      <div class="form-wrap" v-show="Object.keys(currentSponsor).length !== 0">
        <!-- Sponsor -->
        <section>
          <div class="form-wrap-box">
            <section class="form-item">
              <div class="form-item-top">
                <label class="item-lable">*Sponsor</label>
                <div class="item-main">
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
            </section>
          </div>
        </section>
        <!-- Upline -->
        <section style="margin-top:10px">
          <div class="form-wrap-box">
            <section class="form-item">
              <div class="form-item-top">
                <label class="item-lable">*Upline</label>
                <div class="item-main">
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
            </section>
          </div>
        </section>
      </div>
      <div class="form-wrap" style="margin-top:10px">
        <!-- *Sponsor -->
        <section>
          <div class="form-wrap-box">
            <section class="form-item">
              <div class="form-item-top">
                <p
                  v-if="Object.keys(currentSponsor).length !== 0"
                  class="item-p"
                >Or you want to modify your Upline</p>
                <label v-else class="item-lable">*Sponsor</label>
                <div class="item-main">
                  <input
                    class="item-main-inner"
                    type="text"
                    placeholder="*Upline Distributor Id or Mobile Phone or E-mail"
                    :class="showHelpBlock2 && !sponsor ? 'show-help' : ''"
                    v-model="sponsor"
                  />
                  <button class="item-searchbtn" @click="searchHandle">Search</button>
                </div>
              </div>
              <div class="form-item-bottom">
                <small
                  ref="showHelpBlock2"
                  class="help-block"
                  v-show="showHelpBlock2 && !sponsor"
                >Required</small>
                <small
                  ref="showHelpBlockSponsor"
                  class="help-block"
                  v-if="showHelpBlockSponsor"
                >*Please connect your sponsor</small>
              </div>
            </section>
          </div>
        </section>
      </div>
      <!-- system-recommend -->
      <div class="system-recommend" v-show="!recommendList.length">
        <p
          class="no-data"
          v-show="!recommendList.length && showNoData"
        >We couldn't find any matching Distributor. Please, try with a different term.</p>
        <div>
          <p class="not-find">Can't find who you're looking for or don't know any distributor?</p>
          <img @click="getRecommend" src="../../static/img/become.png" alt />
        </div>
      </div>
      <!-- 赞助商列表 -->
      <div class="recommend-list" v-show="recommendList.length">
        <p class="tableTips" v-show="tableTips">
          We can recommend
          <span>{{recommendList.length}}</span> matches for you to choose from
        </p>
        <p class="tableTips" v-show="!tableTips">
          We found
          <span>{{recommendList.length}}</span> matches based on your search
        </p>
        <!-- loading -->
        <my-loading :show="showLoading"></my-loading>
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
      <!-- 年龄不足18的弹框 -->
      <my-dialog
        title="Minor reminder"
        :showDialog="showDialog"
        showCancel
        @dialogHandle="dialogHandle"
        @closeDialog="closeDialog"
      >
        <div slot="dialog-text" class="dialog-text">
          <p>Sorry,you can’t be a distributor of BF Suma if you are under 18 years old.</p>
          <p>But you can recommend relative or neighbor around you who is over 18 to become distributors of BFSuma!</p>
          <p>If you are over 16, you can try our products.</p>
          <a href="http://www.bfsuma.com/products/en">Now，have a look at the product！</a>
        </div>
      </my-dialog>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
import { sponsorRecommend, getAllCountry, searchSponsor } from "@/api/index";
import { Checkbox } from "vant";
import myDialog from "@/components/my-dialog";
import myHeader from "@/components/my-header";
import myStep from "@/components/my-step";
import myLoading from "@/components/my-loading";

export default {
  data() {
    return {
      checked: true,
      showDialog: false,
      showNoData: false,
      showHelpBlock: false,
      showHelpBlock1: false,
      showHelpBlock2: false,
      showLoading: false,
      showHelpBlockSponsor: false,
      tableTips: false,
      currentStep: 0,
      currentSponsor: {},
      formParams: {
        // country: "Kenya",
        country: "",
        // city: "NAIROBI",
        city: ""
      },
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
  computed: {},
  watch: {
    sponsor: val => {
      if (val) {
        console.log("sponsor", val);
      }
    },
    formParams: {
      handler: function() {
        const { country, city } = this.formParams;
        // country
        if (!country) {
          this.showHelpBlock = true;
        } else {
          this.showHelpBlock = false;
        }
        // city
        if (!city) {
          this.showHelpBlock1 = true;
        } else {
          this.showHelpBlock1 = false;
          if (this.showHelpBlockSponsor) {
            this.showHelpBlockSponsor = false;
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    // this.getAllCountry();
    // this.getRecommend();
  },
  methods: {
    dialogHandle(flag) {
      if (!flag) {
        this.showDialog = false;
        this.$refs.input.checked = true;
      } else {
        location.href = "http://www.bfsuma.com/en";
      }
    },
    closeDialog() {
      this.showDialog = false;
      this.$refs.input.checked = true;
    },
    selectChange() {
      this.recommendList = [];
    },
    async searchHandle() {
      // 非空验证
      const { country, city } = this.formParams;
      if (!country) {
        this.showHelpBlock = true;
        this.showHelpBlock1 = true;
        this.showHelpBlock2 = true;
      } else if (!city) {
        this.showHelpBlock1 = true;
        this.showHelpBlock2 = true;
      } else if (!this.sponsor.trim()) {
        this.showHelpBlock2 = true;
        return;
      } else {
        // 发送异步请求搜索赞助者
        let { country, city } = this.formParams;
        let res = await searchSponsor(
          country,
          city,
          this.sponsor.trim(),
          6,
          1,
          1573693207826
        );
        console.log(res);
        this.recommendList = res.list;
        if (!this.recommendList.length) {
          this.showNoData = true;
        }
        this.tableTips = false;
      }
    },
    // 获取推荐赞助商列表
    async getRecommend() {
      const { country, city } = this.formParams;
      // 非空验证
      if (!country) {
        this.showHelpBlock = true;
        this.showHelpBlock1 = true;
      } else if (!city) {
        this.showHelpBlock1 = true;
        return;
      } else {
        this.showLoading = true;
        let res = await sponsorRecommend(country, city);
        if (res) this.showLoading = false;
        this.recommendList = res.data;
        this.tableTips = true;
      }
    },
    // 异步请求国家
    async getAllCountry() {
      let res = await getAllCountry();
      this.countryList = res.data;
    },
    // 连接赞助商
    connectHandle(item) {
      // 存储到session
      let obj = {
        distributorId: item.distributorId,
        uplineId: item.distributorId,
        sponsorData: item,
        uplineData: item,
        distSponsor: {
          country: this.formParams.country,
          city: this.formParams.city
        }
      };
      sessionStorage.setItem("connectObj", JSON.stringify(obj));
      this.currentSponsor = item;
      this.recommendList = [];
      this.sponsor = "";
      this.showHelpBlockSponsor = false;
    },

    submitHandle() {},
    nextHandle() {
      // 读取session
      let connectObj = JSON.parse(sessionStorage.getItem("connectObj"));
      if (!connectObj) {
        this.showHelpBlockSponsor = true;
      } else {
        const { country, city } = this.formParams;
        if (!country) {
          this.showHelpBlock = true;
        } else if (!city) {
          this.showHelpBlock1 = true;
        } else {
          this.$router.push("/PersonalInformation");
        }
      }
    }
  },
  components: {
    "van-checkbox": Checkbox,
    "my-dialog": myDialog,
    "my-header": myHeader,
    "my-step": myStep,
    "my-loading": myLoading
  }
};
</script>

<style scoped lang="stylus">
select, input
  padding-left 10px
::placeholder
  letter-spacing -0.4px
#country-cont
  .form
    margin 20px 0 38px 0
    padding 20px
    background-color #fff
    @media (max-width: 980px)
      margin-top 0
      padding 8px
      min-height 100vh
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
    .required
      margin 12px 0 0 0
      color #5BA2CC
    .checkbox
      display flex
      margin-left 20px
      margin-top 30px
      @media (max-width: 980px)
        margin 10px 0 0 5px
      .checkbox-label
        color #4295C5
        font-weight bold
        padding-right 10px
        border-right 1px solid #bababa
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
    .form-wrap
      margin-top 20px
      >section
        display flex
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
            &.margin-l
              margin-left 20px
              @media (max-width: 980px)
                margin-left 0
            @media (max-width: 980px)
              margin 12px 0
              background-color #fff
              flex-direction column
            .form-item-top
              display flex
              height 40px
              line-height 40px
              background-color #E6F0F3
              @media (max-width: 980px)
                display flex
                flex-direction column
              .item-lable
                display inline-block
                font-weight bold
                border-right 1px solid #BABABA
                color #4295C5
                padding-right 10px
                margin 10px 0 10px 20px
                height 20px
                line-height 20px
                white-space nowrap
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
                padding-left 6px
                @media (max-width: 980px)
                  padding-top 4px
                  line-height 36px
                  background-color #E6F0F3
                span
                  margin-left 15px
                .item-main-inner
                  flex 1
                  height 100%
                  color rgb(87, 87, 87)
                  &.show-help
                    box-shadow rgb(255, 174, 174) 0px 0px 0px 100px inset
                    &::placeholder
                      color #fff
                .item-searchbtn
                  height 100%
                  color #fff
                  background-color #5ba2cc
                  border-radius 4px
                  padding 0 8px
            .form-item-bottom
              height 20px
              line-height 20px
              .help-block
                color #a94442
                font-weight normal
                @media (max-width: 980px)
                  display none
                  margin-top 4px
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
      margin-bottom 20px
      border 0
      border-top 1px solid #b7b7b7
      @media (max-width: 980px)
        display none
    .connect-foot
      display flex
      justify-content space-between
      line-height 40px
      margin 10px
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
          border 1px solid #ccc
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
    .system-recommend
      text-align center
      .no-data
        text-align left
        margin-top 20px
        font-size 17px
        font-weight 500
        @media (max-width: 980px)
          font-size 13px
      .not-find
        color #575757
        font-size 26px
        margin-top 84px
        @media (max-width: 980px)
          font-size 16px
          margin-top 44px
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
