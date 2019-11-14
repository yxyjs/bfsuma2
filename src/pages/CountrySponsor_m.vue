<template>
  <div class="home-cont">
    <!-- 步骤条 -->
    <section class="step">
      <div class="step-item">
        <div class="step-item-img" :class="{'active':currentStep>=0}">
          <div>1</div>
        </div>
        <div class="step-item-line" :class="{'active':currentStep>=1}"></div>
      </div>
      <div class="step-item">
        <div class="step-item-img" :class="{'active':currentStep>=1}">
          <div>2</div>
        </div>
        <div class="step-item-line" :class="{'active':currentStep>=2}"></div>
      </div>
      <div class="step-item">
        <div class="step-item-img" :class="{'active':currentStep>=2}">
          <div>3</div>
        </div>
        <div class="step-item-line" :class="{'active':currentStep>=3}"></div>
      </div>
      <div class="step-item">
        <div class="step-item-img" :class="{'active':currentStep>=3}">
          <div>4</div>
        </div>
      </div>
    </section>
    <p class="top-desc">
      You are now taking your first steps to becoming a BF Suma Distributor.
      <br />Begin the registration process by selecting a country and your upline below：
    </p>
    <div class="form-main">
      <h3>Country & Upline</h3>
      <form @submit.prevent="submitHandle" action="/" class="form-items">
        <section class="form-item">
          <p class="form-item-title">
            <span>*</span>I am at least 18 years old
          </p>
          <van-checkbox v-model="checked" @click="toggleChecked"></van-checkbox>
        </section>
        <section class="form-item">
          <p class="form-item-title">
            <span>*</span>Country
          </p>
          <div class="form-item-right">
            <!-- <p class="right-placehold" v-show="!formParams.country">Select Registrant's Country</p> -->
            <p class="right-placehold">Select Registrant's Country</p>
            <select
              name="country"
              id="country"
              class="right-select one"
              v-model="formParams.country"
            >
              <option
                :value="country.id"
                v-for="(country,index) in countryList"
                :key="index"
              >{{country.name}}</option>
            </select>
          </div>
        </section>
        <section class="form-item">
          <p class="form-item-title">
            <span>*</span>State/Region
          </p>
          <div class="form-item-right">
            <!-- <p class="right-placehold" v-show="!formParams.city">Select Registrant's State/Region</p> -->
            <p class="right-placehold">Select Registrant's State/Region</p>
            <select name="city" id="city" class="right-select two" v-model="formParams.city">
              <option value="one">one</option>
              <option value="two">two</option>
            </select>
          </div>
        </section>
        <section class="form-item">
          <p class="form-item-title">
            <span>*</span>Sponsor
          </p>
          <input
            v-show="!isConnected"
            class="form-item-input"
            type="text"
            placeholder="Fill in you Sponsor Distrinbutor Name or ID"
            v-model="formParams.sponsor"
          />
          <div class="form-item-sponsor" v-show="isConnected">
            <p>
              <span>Gage get</span>
            </p>
            <p>
              <span>ID :</span>
              <span>{{currentSponsor.distributorId}}</span>
            </p>
            <p>
              <span>Gender :</span>
              <span>{{currentSponsor.gender}}</span>
            </p>
            <p>
              <span>Mobile Number:</span>
              <span>{{currentSponsor.phone}}</span>
            </p>
            <p>
              <span>E-mail:</span>
              <span>{{currentSponsor.email}}</span>
            </p>
          </div>
        </section>
        <section class="form-item" v-show="isConnected">
          <p class="form-item-title">
            <span>*</span>Upline
          </p>
          <div class="form-item-sponsor flag">
            <p>
              <span>Gage get</span>
            </p>
            <p>
              <span>ID :</span>
              <span>{{currentSponsor.distributorId}}</span>
            </p>
            <p>
              <span>Gender :</span>
              <span>{{currentSponsor.gender}}</span>
            </p>
            <p>
              <span>Mobile Number:</span>
              <span>{{currentSponsor.phone}}</span>
            </p>
            <p>
              <span>E-mail:</span>
              <span>{{currentSponsor.email}}</span>
            </p>
          </div>
        </section>
        <section class="upline-search" v-show="isConnected">
          <p class="upline-search-title">Or you want to modify your Upline</p>
          <div class="upline-search-wrap">
            <input type="text" placeholder="please input ..." />
            <button @click="searchSponsor">Search</button>
          </div>
        </section>
      </form>
    </div>
    <p class="match-sponsor">
      We can recommend
      <span>{{recommendList.length}}</span> matches for you to choose from
    </p>
    <div class="table-cont">
      <table>
        <thead>
          <tr>
            <th class="fixed-td thead left">Distributor Name</th>
            <th class="placeholder-td left">111111111111111</th>
            <th class="bar-td left"></th>
            <th style="padding-left:.2rem">Distributor ID</th>
            <th>Gender</th>
            <th>State/Region</th>
            <th>Mobile Number</th>
            <th style="border-right:none;">E-mail</th>
            <td class="bar-td right"></td>
            <th class="placeholder-td right">111111111111</th>
            <th class="fixed-td thead right">Connect</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(recommend ,index) in recommendList" :key="index">
            <td class="fixed-td tbody left">
              <span class="fixed-td-span">{{recommend.distributorName}}</span>
            </td>
            <td class="placeholder-td left">111111111111111</td>
            <td class="bar-td left"></td>
            <td style="padding-left:.2rem;">{{recommend.distributorId}}</td>
            <td>{{recommend.gender}}</td>
            <td>{{recommend.city}}</td>
            <td>{{recommend.phone}}</td>
            <td style="border-right:none;">{{recommend.email}}</td>
            <td class="bar-td right"></td>
            <td class="placeholder-td right">111111111111</td>
            <td class="fixed-td tbody right">
              <button class="tbody-btn" @click="connectHandle(recommend)">Connect</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="system-recommend">
      <p
        class="system-recommend-tips"
        v-show="showNoData"
      >Sorry，We couldn't find any matching Distributor.</p>
      <div class="system-recommend-wrap">
        <button class="system-recommend-button">
          <i class="iconfont icon-xuanzhuan"></i> System Recommendation
        </button>
        <p
          class="system-recommend-text"
        >Can't find who you're looking for or don't know any distributor?</p>
      </div>
    </div>
    <!-- footer -->
    <footer class="foot-handle">
      <button class="foot-handle-button button-left">Quit</button>
      <button
        class="foot-handle-button button-right"
        :class="{'gray':disabled}"
        @click="submitHandle"
      >Submit</button>
    </footer>
    <!-- dialog -->
    <my-dialog :isShow="showDialog" bgc="#E06178" @on-cancel="onCancel" @on-confirm="onConfirm">
      <div class="dialog-desc">
        <p>
          Sorry, you can't be a distributor of
          BFSuma under 18.
        </p>
        <p>
          But you can recommend relatives or neighbors around you who is over 18
          to become distributors of BFSuma!
        </p>
        <p>If you are over 16, do buy BFSuma products.</p>
        <a href="http://172.18.1.240:73/products/en">Now, have a look at the product!</a>
      </div>
    </my-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { sponsorRecommend, getAllCountry, searchSponsor } from "../api/index";
import { Checkbox } from "vant";
import myDialog from "@/components/my-dialog";

export default {
  data() {
    return {
      checked: true,
      showDialog: false,
      showNoData: false,
      isConnected: false,
      currentStep: 0,
      currentSponsor: {},
      formParams: {
        country: "Kenya",
        city: "NAIROBI",
        sponsor: ""
      },
      recommendList: [],
      countryList: []
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
      }
    },
    async getAllCountry() {
      let res = await getAllCountry();
      this.countryList = res.data;
    },
    connectHandle(item) {
      this.isConnected = true;
      this.currentSponsor = item;
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
@import '../../static/stylus/mobile'

// 主样式
.home-cont
  margin-bottom 0.7rem
  // @media screen and (min-width: 1120px)
  .step
    display flex
    padding 0.08rem 0.13rem 0.08rem 0.08rem
    background-color #fff
    box-shadow 0px 2px 8px 0px rgba(156, 156, 156, 0.14)
    .step-item
      flex 1
      display flex
      align-items center
      @media screen and (min-width: 1120px)
        // background-color #C93873
        height 44px
      &:last-child
        flex 0
        width 0.4rem
      .step-item-img
        position relative
        width 0.4rem
        height 0.4rem
        line-height 0.4rem
        background-color $border-color
        border-radius 50%
        text-align center
        // @media screen and (min-width: 1120px)
        //   background-color #C93873
        &::after
          position absolute
          right -0.03rem
          top 50%
          margin-top -0.03rem
          transform rotate(45deg)
          content ''
          display block
          width 0.06rem
          height 0.06rem
          background-color $border-color
        >div
          display inline-block
          width 0.28rem
          height 0.28rem
          line-height 0.29rem
          color #fff
          border 0.015rem solid
          box-shadow 0 2px 3px 0 rgba(0, 0, 0, 0.33)
          border-radius 50%
          text-shadow 0 2px 4px rgba(0, 0, 0, 0.5)
        &.active
          background-color $page-one-color
          &::after
            background-color $page-one-color
      .step-item-line
        flex 1
        height 0.02rem
        background-color $border-color
        &.active
          background-color $page-one-color
  .top-desc
    margin 0.1rem
    padding 0.12rem 0.13rem
    color #fff
    font-family PingFang-SC-Medium, PingFang-SC
    font-weight 500
    font-size 0.13rem
    line-height 0.18rem
    background linear-gradient(135deg, rgba(247, 139, 124, 1) 0%, rgba(201, 56, 115, 1) 100%)
    box-shadow 0px 0px 18px 4px rgba(156, 156, 156, 0.14)
    border-radius 5px
    @media screen and (min-width: 1120px)
      padding 0
      margin 20px 0 0 0
      background #fff
      box-shadow none
      color #575757
      line-height 20px
      font-weight bold
      font-family PingFang-SC-Bold
      border-radius 0
  .form-main
    background-color #fff
    border-top 1px solid transparent
    >h3
      position relative
      color $page-one-color
      font-size 0.14rem
      margin 0.15rem 0 0.15rem 0.05rem
      padding-left 0.12rem
      @media screen and (min-width: 1120px)
        display none
      &::before
        content ''
        position absolute
        left 0
        top 50%
        transform translateY(-50%)
        width 0.04rem
        height 0.14rem
        background-color $page-one-color
        border-radius 7px
        box-shadow 0px 12px 10px 0px rgba(156, 156, 156, 0.14)
    .form-items
      padding 0 0.09rem 0.2rem
      font-size 0.14rem
      .form-item
        display flex
        justify-content space-between
        border-bottom 1px dashed #FFB3D2
        // height 0.52rem
        line-height 0.52rem
        @media screen and (min-width: 1120px)
          width 524px
          border-bottom none
          margin-top 10px
          height 40px
          line-height 40px
          padding 0 0 0 10px
          border 0 none
          box-shadow none
        &:last-child
          border-bottom 1px solid #CFD3D2
        .form-item-title
          >span
            color $page-one-color
          @media screen and (min-width: 1120px)
            font-weight bold
            color #C93873
        .form-item-right
          display flex
          // @media screen and (min-width: 1120px)
          .right-placehold
            color #CFD3D2
            font-size 0.135rem
            margin-right 0.2rem
          .right-select
            position absolute
            right 0.12rem
            height 0.52rem
            line-height 0.52rem
            &.one
              width 2rem
            &.two
              width 2.3rem
            option
              color #696969
            @media screen and (min-width: 1120px)
              position static
          .right-icon
            font-size 0.2rem
            color #FFB3D2
            margin-left 0.04rem
            background-color #fff
            z-index 2
            width 0.25rem
        .form-item-input
          width 100%
          margin-left 0.12rem
          font-size 0.135rem
        .form-item-sponsor
          width 100%
          margin 0.45rem 0 0.12rem -0.5rem
          line-height 0.26rem
          &.flag
            padding-left 0.12rem
          p
            display flex
            justify-content space-between
            span
              &:first-child
                font-weight 600
      .upline-search
        margin 0.15rem 0.1rem 0 0.1rem
        .upline-search-title
          font-size 0.14rem
        .upline-search-wrap
          display flex
          margin-top 0.15rem
          height 0.3rem
          line-height 0.3rem
          input
            flex 1
            background-color #FAEBF1
            border-radius 23px
            text-indent 0.13rem
          button
            width 0.77rem
            margin-left 0.15rem
            background-color $page-one-color
            color #fff
            border-radius 23px
  .match-sponsor
    margin 0.1rem
    span
      color $page-one-color
    @media screen and (min-width: 1120px)
      font-size 14px
  .table-cont
    width 100%
    overflow auto
    white-space nowrap
    @media screen and (min-width: 1120px)
      margin-top 20px
    table
      @media screen and (min-width: 1120px)
        width 100%
      thead
        color #9B9B9B
        box-shadow 0px 2px 8px 0px rgba(156, 156, 156, 0.14)
        .bar-td
          position absolute
          background linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(244, 244, 244, 1) 100%, rgba(255, 255, 255, 1) 100%)
          border none
          @media screen and (min-width: 1120px)
            display none
          &.left
            left 1.2rem
          &.right
            right 0.8rem
      tbody
        color #E06178
        background-color #FAEBF1
        box-shadow 0px 2px 8px 0px rgba(156, 156, 156, 0.14)
        tr
          position relative
          border-bottom 1px solid #E6BECD
          .bar-td
            position absolute
            background linear-gradient(270deg, rgba(250, 235, 241, 1) 0%, rgba(243, 211, 224, 1) 100%)
            border none
            @media screen and (min-width: 1120px)
              display none
            &.left
              left 1.2rem
            &.right
              right 0.8rem
      .fixed-td
        position absolute
        text-align center
        color #696969
        z-index 2
        border-right none
        @media screen and (min-width: 1120px)
          position static
        &.thead
          background-color #fff
          @media screen and (min-width: 1120px)
            left 0
        &.tbody
          color #E06178
          background-color #FAEBF1
        &.left
          left 0
          width 1.1rem
          overflow auto
        &.right
          right 0
          width 0.7rem
          // @media screen and (min-width: 1120px)
          // right 100px
      .placeholder-td
        opacity 0
        &.left
          border-left none
          border-left none
          width 1.1rem
        &.right
          width 0.7rem
        @media screen and (min-width: 1120px)
          display none
      th, td
        text-align center
        padding 0 0.05rem
      th
        height 0.41rem
        line-height 0.41rem
        background-color #fff
        border-right 1px solid #ECEEF5
        @media screen and (min-width: 1120px)
          height 50px
      td
        height 0.45rem
        line-height 0.45rem
        border-right 1px solid #E6BECD
        @media screen and (min-width: 1120px)
          height 50px
        .tbody-btn
          width 0.68rem
          height 0.25rem
          line-height 0.25rem
          color #fff
          background-color $page-one-color
          box-shadow 0px 2px 8px 0px rgba(156, 156, 156, 0.14)
          border-radius 15px
  .system-recommend
    margin 0 0.05rem
    border-top 1px solid transparent
    background-color #fff
    box-shadow 0px 2px 8px 0px rgba(156, 156, 156, 0.14)
    .system-recommend-tips
      background-color #fff
      margin 0.1rem 0 0 0.1rem
    .system-recommend-wrap
      display flex
      flex-direction column
      padding 0.3rem 0.69rem
      .system-recommend-button
        font-size 0.14rem
        color $page-one-color
      .system-recommend-text
        margin-top 0.1rem
        color #9C9C9C
        text-align center
        line-height 0.16rem
  .foot-handle
    position fixed
    left 0
    right 0
    bottom 0
    display flex
    z-index 2
    .foot-handle-button
      flex 1
      height 0.6rem
      text-align center
      font-size 0.17rem
      font-weight bold
    .button-left
      color $page-one-color
      background-color #fff
      box-shadow 0px -2px 8px 0px rgba(156, 156, 156, 0.14)
    .button-right
      color #fff
      background-color $page-one-color
      box-shadow 0px -2px 8px 0px rgba(156, 156, 156, 0.14)
      &.gray
        filter grayscale(1)
  .dialog-desc
    padding 0.35rem 0.3rem
    p
      font-size 0.16rem
      margin-bottom 0.2rem
    a
      color $page-one-color
      margin-bottom 0
</style>
