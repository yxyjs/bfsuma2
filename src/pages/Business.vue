<template>
  <div id="business-cont">
    <my-header />
    <my-step>
      <img src="../../static/img/business.png" alt />
    </my-step>
    <div class="business-mid">
      <section class="md-item">
        <p class="item-title blue">Congratulations on your successful registration.</p>
        <p
          class="item-title"
        >The staff of BFSuma Kenya company will contact you to send your welcome kit.</p>
      </section>
      <section class="md-item">
        <p class="item-title">We will send you gifts at this address.</p>
        <p class="item-title">
          You have not filled in the shipping address yet.
          <span
            class="add-address"
          >Add Shipping Address</span>
        </p>
        <div class="item-content">{{firstName}} {{lastName}} {{phone}}</div>
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
                <p class="item-list-right">{{uplineData.membId}}</p>
              </div>
              <div class="item-list">
                <p>Name：</p>
                <p class="item-list-right">{{uplineData.name}}</p>
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
                <p class="item-list-right">{{sponsorData.membId}}</p>
              </div>
              <div class="item-list">
                <p>Name：</p>
                <p class="item-list-right">{{sponsorData.name}}</p>
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
  </div>
</template>

<script type="text/ecmascript-6">
import { distributorCustomer } from "@/api/index";
import myHeader from "@/components/my-header";
import myStep from "@/components/my-step";
import myToast from "@/components/my-toast";
import myDialog from "@/components/my-dialog";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      country: "",
      city: "",
      sponsorData: {},
      uplineData: {}
    };
  },
  mounted() {
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
        this.city = resData.city;
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
    margin-bottom 38px
    margin-top 20px
    .md-item
      padding 10px 0
      &:not(:last-child)
        border-bottom 1px solid #C2C2C2
      &:first-child
        padding-top 0
      .item-title
        line-height 30px
        font-family PingFang-SC-Bold
        font-weight bold
        .add-address
          color #5BA2CC
          font-weight normal
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
            .item-list
              .item-list-right
                text-align right
</style>
