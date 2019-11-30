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
            <img class="item-img" src="../../../../static/img/payment_banner.png" alt />
            <p class="item-text">Distributor Register Fee</p>
            <p class="item-text">KES {{payAmount}}</p>
          </div>
        </section>
        <section class="main-item">
          <p class="item-title">Your Upline</p>
          <div class="item-list-box">
            <div class="item-list">
              <p>Distributor ID：</p>
              <p class="item-list-right">{{uplineData.distributorId || uplineData.membId}}</p>
            </div>
            <div class="item-list">
              <p>Name：</p>
              <p class="item-list-right">{{uplineData.distributorName || uplineData.name}}</p>
            </div>
            <div class="item-list">
              <p>Address：</p>
              <p
                class="item-list-right"
              >{{distSponsor.city || uplineData.city}}&nbsp;&nbsp;{{distSponsor.country || uplineData.country}}</p>
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
              <p class="item-list-right">{{sponsorData.distributorId || sponsorData.membId}}</p>
            </div>
            <div class="item-list">
              <p>Name：</p>
              <p class="item-list-right">{{sponsorData.distributorName || sponsorData.name}}</p>
            </div>
            <div class="item-list">
              <p>Address：</p>
              <p
                class="item-list-right"
              >{{distSponsor.city || sponsorData.city}}&nbsp;&nbsp;{{distSponsor.country || sponsorData.country}}</p>
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
      <button
        class="goback"
        type="button"
        @click="$router.push('/register/distributor/payment')"
      >go pay now</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { distributorCustomer, payBill } from "@/api/index";
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
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      //登录进来的
      const id = user.id;
      this.distributorCustomer(id);
      this.payBill(id);
    } else {
      //注册进来的
      let sponsorData = JSON.parse(sessionStorage.getItem("sponsorData"));
      if (sponsorData) {
        this.sponsorData = sponsorData;
      }
      let uplineData = JSON.parse(sessionStorage.getItem("uplineData"));
      if (uplineData) {
        this.uplineData = uplineData;
      }
      let distSponsor = JSON.parse(sessionStorage.getItem("distSponsor"));
      if (distSponsor) {
        this.distSponsor = distSponsor;
      }
      let distInformation = JSON.parse(
        sessionStorage.getItem("distInformation")
      );
      if (distInformation) {
        this.firstName = distInformation.firstName;
        this.lastName = distInformation.lastName;
      }
      let mySponsor = JSON.parse(sessionStorage.getItem("mySponsor"));
      if (mySponsor) {
        this.payAmount = toThousands(mySponsor.payAmount);
      }
    }
  },
  methods: {
    async distributorCustomer(id) {
      let res = await distributorCustomer(id);
      if (res) {
        const rescode = res.code;
        if (rescode === 0) {
          const resdata = res.data;
          sessionStorage.setItem("distInformation", JSON.stringify(resdata));
          this.firstName = resdata.firstName;
          this.lastName = resdata.lastName;
          this.sponsorData = resdata.sponsor;
          this.uplineData = resdata.upline;
          this.payAmount = resdata.payAmount;
        }
      }
    },
    async payBill(id) {
      let res = await payBill(id);
      const rescode = res.code;
      if (rescode === 0) {
        const resdata = res.data;
        this.payAmount = resdata.payAmount;
        sessionStorage.setItem("mySponsor", JSON.stringify(resdata));
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus">
#personal-cont
  margin 38px 0
  background-color #fff
  @media (max-width: 980px)
    margin 0
    min-height 100vh
  .personal-mid
    padding 20px
    @media (max-width: 980px)
      padding 8px
    .top-tips
      font-size 14px
      font-weight bold
      color #575757
      line-height 30px
      @media (max-width: 980px)
        line-height 1.5
        padding 10px
    .personal-main
      display flex
      margin-top 50px
      @media (max-width: 980px)
        display block
        margin-top 20px
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
            border-left none
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
      @media (max-width: 980px)
        width 100%
        margin-left 0
        margin-top 20px
      &:hover
        background-color #286090
</style>


