<template>
  <div id="personal-cont">
    <div class="personal-mid">
      <p class="top-tips">Hello，{{firstName}} {{lastName}},Welcome to BF Suma！</p>
      <div class="personal-main">
        <section class="main-item">
          <p
            class="item-title head"
          >The distributor registration fee order has not been paid yet, go pay now.</p>
          <div class="item-list-box" style="border-left:none">
            <img class="item-img" src="../../static/img/payment_banner.png" alt />
            <p class="item-text">Distributor Register Fee</p>
            <p class="item-text">KES {{payAmount}}</p>
          </div>
        </section>
        <section class="main-item">
          <p class="item-title">Your Upline</p>
          <div class="item-list-box">
            <div class="item-list">
              <p>Distributor ID：</p>
              <p class="item-list-right">{{uplineData.distributorId}}</p>
            </div>
            <div class="item-list">
              <p>Name：</p>
              <p class="item-list-right">{{uplineData.distributorName}}</p>
            </div>
            <div class="item-list">
              <p>Address：</p>
              <p class="item-list-right">{{distSponsor.city}}&nbsp;&nbsp;{{distSponsor.country}}</p>
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
              <p class="item-list-right">{{sponsorData.distributorId}}</p>
            </div>
            <div class="item-list">
              <p>Name：</p>
              <p class="item-list-right">{{sponsorData.distributorName}}</p>
            </div>
            <div class="item-list">
              <p>Address：</p>
              <p class="item-list-right">{{distSponsor.city}}&nbsp;&nbsp;{{distSponsor.country}}</p>
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
      <button class="goback" type="button" @click="$router.go(-1)">go pay now</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { toThousands } from "@/util/tool.js";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      payAmount: "",
      sponsorData: {},
      uplineData: {},
      distSponsor: {}
    };
  },
  mounted() {
    let payInfo = JSON.parse(sessionStorage.getItem("payInfo"));
    this.firstName = payInfo.firstName;
    this.lastName = payInfo.lastName;
    let mySponsor = JSON.parse(sessionStorage.getItem("mySponsor"));
    this.payAmount = toThousands(mySponsor.payAmount);
    let connectObj = JSON.parse(sessionStorage.getItem("connectObj"));
    this.sponsorData = connectObj.sponsorData;
    this.uplineData = connectObj.uplineData;
    this.distSponsor = connectObj.distSponsor;
  },
  components: {}
};
</script>

<style scoped lang="stylus">
#personal-cont
  margin 38px 0
  background-color #fff
  .personal-mid
    padding 20px
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
    .personal-main
      display flex
      margin-top 50px
      .main-item
        flex 1
        &:not(:first-child)
          padding-left 26px
        &::before
          position absolute
          content ''
          display inline-block
          width 8px
          height 20px
          // line-height 30px
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
          .item-list
            .item-list-right
              text-align right
    .goback
      color #fff
      background-color #5BA2CC
      margin-left 20px
      padding 10px 14px
      border-radius 4px
      font-size 14px
      &:hover
        background-color #286090
</style>


