<template>
  <div id="personal-cont">
    <SumaHeader path="personal" @handleExit="handleExit"></SumaHeader>
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
        ref="goPay"
        class="goback"
        type="button"
        @click="$router.push('/register/distributor/payment')"
      >go pay now</button>
    </div>
    <my-dialog
      title="Are you sure to exit？"
      showCancel
      :showDialog="showDialog"
      @dialogHandle="dialogHandle"
      @closeDialog="showDialog = false"
    >
      <div class="dialog-img" slot="dialog-img">
        <i class="iconfont icon--quetion-pane"></i>
      </div>
    </my-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { distributorCustomer, payBill, BASE_URL } from "@/api/index";
import { toThousands, session } from "@/util/tool.js";
import SumaHeader from "@/components/SumaHeader";
import myDialog from "@/components/my-dialog";
export default {
  data() {
    return {
      showDialog: false,
      firstName: "",
      lastName: "",
      payAmount: "",
      sponsorData: {},
      uplineData: {},
      distSponsor: {}
    };
  },
  mounted() {
    const myDistributorId = session.get("myDistributorId");
    if (myDistributorId) {
      this.$refs.goPay.style.display = "none";
    }

    let user = session.get("user");
    if (user) {
      //登录进来的
      const id = user.id;
      this.distributorCustomer(id);
      this.payBill(id);
    } else {
      //注册进来的
      let sponsorData = session.get("sponsorData");
      if (sponsorData) {
        this.sponsorData = sponsorData;
      }
      let uplineData = session.get("uplineData");
      if (uplineData) {
        this.uplineData = uplineData;
      }
      let distSponsor = session.get("distSponsor");
      if (distSponsor) {
        this.distSponsor = distSponsor;
      }
      let distInformation = session.get("distInformation");
      if (distInformation) {
        this.firstName = distInformation.firstName;
        this.lastName = distInformation.lastName;
      }
      let mySponsor = session.get("mySponsor");
      if (mySponsor) {
        this.payAmount = toThousands(mySponsor.payAmount);
      }
    }
  },
  methods: {
    // 获取顾客信息
    async distributorCustomer(id) {
      let res = await distributorCustomer(id);
      if (res) {
        const rescode = res.code;
        if (rescode === 0) {
          const resdata = res.data;
          session.set("distInformation", resdata);
          this.firstName = resdata.firstName;
          this.lastName = resdata.lastName;
          this.sponsorData = resdata.sponsor;
          this.uplineData = resdata.upline;
          this.payAmount = resdata.payAmount;
        }
      }
    },
    // 获取支付信息
    async payBill(id) {
      let res = await payBill(id);
      const rescode = res.code;
      if (rescode === 0) {
        const resdata = res.data;
        this.payAmount = resdata.payAmount;
        session.set("mySponsor", resdata);
      }
    },
    handleExit() {
      this.showDialog = true;
    },
    dialogHandle(flag) {
      if (flag) {
        session.clear();
        location.href = BASE_URL;
      } else {
        this.showDialog = false;
      }
    }
  },
  components: {
    SumaHeader,
    "my-dialog": myDialog
  }
};
</script>

<style scoped lang="stylus">
@import '../../../../static/stylus/common.styl'

#personal-cont
  margin 38px 0
  background-color #fff
  @media (max-width: 980px)
    margin 0
    min-height 100vh
  .personal-mid
    margin-top 136px
    padding 20px
    @media (max-width: 980px)
      margin-top 50px
      padding 8px
    .top-tips
      font-weight bold
      color #575757
      line-height 30px
      @media (max-width: 980px)
        line-height 1.5
    .personal-main
      display flex
      margin-top 50px
      @media (max-width: 980px)
        display block
        margin 8px 10px 0 8px
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
      @media (max-width: 980px)
        width 100%
        margin 20px 0 16px 0
        padding 14px
      &:hover
        background-color #286090
</style>


