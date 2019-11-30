<template>
  <div id="country-cont">
    <my-header>
      <a href="javascript:;" @click="$router.replace('/register')">Register</a>
      <span>/ Distributor Register</span>
    </my-header>
    <my-step>
      <img src="../../../../static/img/country_sponsor.png" alt />
    </my-step>
    <ValidationObserver
      ref="observer"
      @submit.prevent="onSubmit"
      v-slot="{ invalid }"
      tag="form"
      class="form"
    >
      <p class="top-tips">
        You are now taking your first steps to becoming a BF Suma Distributor.
        <br />Begin the registration process by selecting a country and your
        sponsor below：
      </p>
      <p class="required">*Required</p>
      <div class="checkbox">
        <label class="checkbox-label">* I am at least 18 years old</label>
        <div class="checkbox-radio">
          <div class="radio-item">
            <input ref="input" type="radio" name="flag" id="yes" checked />
            <img class="checked-img" src="../../../../static/img/checked.png" alt />
            <label for="yes">Yes</label>
          </div>
          <div class="radio-item" @click="showDialog = true">
            <input type="radio" name="flag" id="no" />
            <img class="checked-img" src="../../../../static/img/checked.png" alt />
            <label for="no">No</label>
          </div>
        </div>
      </div>
      <div class="form-wrap">
        <!-- country -->
        <section>
          <div class="form-wrap-box">
            <ValidationProvider
              name="Country"
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item"
            >
              <div class="form-item-top">
                <label class="item-lable">*Country</label>
                <div class="item-main">
                  <select
                    class="item-main-inner"
                    v-model="formParams.country"
                    @change="countryChange"
                  >
                    <option disabled value style="display:none;">Select Country</option>
                    <option
                      :value="country.name"
                      v-for="(country, index) in countryList"
                      :key="index"
                    >{{ country.name }}</option>
                  </select>
                </div>
              </div>
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
                <span ref="countryEmpty" class="show-required">Required</span>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="City"
              rules="required"
              v-slot="{ errors }"
              tag="section"
              class="form-item margin-l"
            >
              <div class="form-item-top">
                <label class="item-lable">*City</label>
                <div class="item-main">
                  <select
                    class="item-main-inner"
                    v-model="formParams.city"
                    @change="cityChange"
                    ref="citySelect"
                  >
                    <option disabled value style="display:none;">Select City</option>
                    <option
                      :value="city.name"
                      v-for="(city,index) in cityList"
                      :key="index"
                    >{{city.name}}</option>
                  </select>
                </div>
              </div>
              <!-- spanhelp -->
              <div class="form-item-bottom">
                <span class="help-block">{{ errors[0] }}</span>
                <span ref="cityEmpty" class="show-required">Required</span>
              </div>
            </ValidationProvider>
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
                <div class="item-main sponsor">
                  Gage get
                  <span>
                    <strong>ID:</strong>
                    {{ currentSponsor.distributorId }}
                  </span>
                  <span>
                    <strong>Gender:</strong>
                    {{ currentSponsor.gender }}
                  </span>
                  <span>
                    <strong>Mobile Number:</strong>
                    {{ currentSponsor.phone}}
                  </span>
                  <span>
                    <strong>E-mail:</strong>
                    {{ currentSponsor.email}}
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
                <div class="item-main sponsor">
                  Gage get
                  <span>
                    <strong>ID:</strong>
                    {{ currentSponsor.distributorId }}
                  </span>
                  <span>
                    <strong>Gender:</strong>
                    {{ currentSponsor.gender }}
                  </span>
                  <span>
                    <strong>Mobile Number:</strong>
                    {{ currentSponsor.phone }}
                  </span>
                  <span>
                    <strong>E-mail:</strong>
                    {{ currentSponsor.email }}
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
                    v-model="sponsor"
                  />
                  <button class="item-searchbtn" type="button" @click="onSearch">Search</button>
                </div>
              </div>
              <div class="form-item-bottom">
                <span ref="searchEmpty" class="show-required">Required</span>
                <span
                  ref="noConnect"
                  class="help-block"
                  style="display:none"
                >*Please connect your sponsor</span>
              </div>
            </section>
          </div>
        </section>
      </div>
      <div class="table-tips">
        <p ref="noData" class="table-tip no-data">
          We couldn't find any matching Distributor. Please, try with a
          different term.
        </p>
        <p ref="recommendMatches" class="table-tip">
          We can recommend
          <span>{{ recommendList && recommendList.length }}</span> matches for you to choose from
        </p>
        <p ref="searchMatches" class="table-tip">
          We found
          <span>{{ recommendList && recommendList.length }}</span> matches based on your search
        </p>
      </div>
      <!-- system-recommend -->
      <div ref="systemRecommend" class="system-recommend">
        <div>
          <p class="not-find">Can't find who you're looking for or don't know any distributor?</p>
          <img @click="getRecommend" src="../../../../static/img/become.png" alt />
        </div>
      </div>
      <!-- 赞助商列表 -->
      <div class="recommend-list">
        <!-- loading -->
        <my-loading :show="showLoading"></my-loading>
        <div ref="tableWrap" class="table-wrap">
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
              <tr v-for="(recommend, index) in recommendList" :key="index">
                <td>{{ recommend.distributorName }}</td>
                <td style="backgroundColor:#DCDCDC">{{ recommend.distributorId }}</td>
                <td>{{ recommend.gender }}</td>
                <td>{{ recommend.city }}</td>
                <td>{{ recommend.phone }}</td>
                <td>{{ recommend.email }}</td>
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
        <button type="submit" class="next-btn" @click="onSubmit">Next</button>
      </div>
    </ValidationObserver>
    <!-- 年龄不足18的弹框 -->
    <my-dialog
      title="Minor reminder"
      :showDialog="showDialog"
      showCancel
      @dialogHandle="dialogHandle"
      @closeDialog="closeDialog"
    >
      <div slot="dialog-text" class="dialog-text">
        <p>
          Sorry,you can’t be a distributor of BF Suma if you are under 18 years
          old.
        </p>
        <p>
          But you can recommend relative or neighbor around you who is over 18
          to become distributors of BFSuma!
        </p>
        <p>If you are over 16, you can try our products.</p>
        <a :href="BASE_URL + '/products/en'">Now，have a look at the product！</a>
      </div>
    </my-dialog>
    <my-toast :toastText="toastText" :showToast="showToast" @closeToast="showToast=false"></my-toast>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  BASE_URL,
  sponsorRecommend,
  searchSponsor,
  getAllCountry,
  getAllCity
} from "@/api/index";
import myDialog from "@/components/my-dialog";
import myHeader from "@/components/my-header";
import myStep from "@/components/my-step";
import myToast from "@/components/my-toast";
import myLoading from "@/components/my-loading";

export default {
  data() {
    return {
      BASE_URL: BASE_URL,
      checked: true,
      showDialog: false,
      showNoData: false,
      showLoading: false,
      showToast: false,
      tableTips: false,
      toastText: "",
      currentSponsor: {},
      formParams: {
        country: "",
        city: ""
      },
      sponsor: "",
      submitClickTime: 0,
      countryList: [],
      cityList: [],
      recommendList: []
    };
  },
  computed: {
    emptyVerify() {
      const { country, city } = this.formParams;
      return country && city;
    }
  },
  watch: {
    sponsor(val) {
      if (!val.trim()) {
        this.$refs.searchEmpty.style.display = "block";
      } else {
        this.$refs.searchEmpty.style.display = "none";
      }
    }
  },
  mounted() {
    /*
     *返回时是否记住之前的选择
     */
    // const distSponsor = JSON.parse(sessionStorage.getItem("distSponsor"));
    // if (distSponsor) {
    //   this.formParams.country = distSponsor.country;
    //   this.formParams.city = distSponsor.city;
    // }
    this.getAllCountry();
  },
  methods: {
    dialogHandle(flag) {
      if (!flag) {
        this.showDialog = false;
        this.$refs.input.checked = true;
      } else {
        location.href = BASE_URL;
      }
    },
    closeDialog() {
      this.showDialog = false;
      this.$refs.input.checked = true;
    },
    countryChange(event) {
      this.formParams.city = "";
      this.cityList = [];
      // 赋值
      let value = event.target.value;
      this.formParams.country = value;
      // 切换显示
      this.$refs.tableWrap.style.display = "none";
      this.$refs.recommendMatches.style.display = "none";
      this.$refs.systemRecommend.style.display = "block";

      const countryList = this.countryList;
      for (let i = 0; i < countryList.length; i++) {
        if (countryList[i].name === this.formParams.country) {
          const areaCode = countryList[i].areaCode;
          console.log(areaCode);
          this.getAllCity(areaCode);
          sessionStorage.setItem("areaCode", areaCode);
        }
      }
    },
    cityChange(event) {
      // 赋值
      let value = event.target.value;
      this.formParams.city = value;
      // 切换显示
      this.$refs.tableWrap.style.display = "none";
      this.$refs.recommendMatches.style.display = "none";
      this.$refs.systemRecommend.style.display = "block";
    },
    async onSearch() {
      const { country, city } = this.formParams;
      if (!this.submitClickTime) {
        if (!country) {
          this.$refs.countryEmpty.style.display = "block";
        }
        if (!city) {
          this.$refs.cityEmpty.style.display = "block";
        }
      }

      if (!this.sponsor.trim()) {
        this.$refs.searchEmpty.style.display = "block";
      } else {
        this.$refs.searchEmpty.style.display = "none";
        this.$refs.systemRecommend.style.display = "none";
        this.showLoading = true;
        const { country, city } = this.formParams;
        const { sponsor } = this;
        const reqData = {
          country: country,
          city: city,
          page: 1,
          rows: 6,
          keyword: sponsor
        };
        let res = await searchSponsor(reqData);
        const rescode = res.code;
        this.showLoading = false;
        const resdata = res.list;

        if (!resdata.length) {
          this.$refs.tableWrap.style.display = "none";
          this.$refs.recommendMatches.style.display = "none";
          this.$refs.noData.style.display = "block";
          this.$refs.systemRecommend.style.display = "block";
        } else {
          this.recommendList = resdata;
          this.$refs.tableWrap.style.display = "block";
          this.$refs.recommendMatches.style.display = "block";
          this.$refs.noData.style.display = "none";
          this.$refs.systemRecommend.style.display = "none";
        }
      }
    },
    async getRecommend() {
      const { country, city } = this.formParams;
      if (!this.submitClickTime) {
        if (!country) {
          this.$refs.countryEmpty.style.display = "block";
        }
        if (!city) {
          this.$refs.cityEmpty.style.display = "block";
        }
      }

      if ((this.$refs.searchEmpty.style.display = "block")) {
        this.$refs.searchEmpty.style.display = "none";
      }
      if ((this.$refs.noConnect.style.display = "block")) {
        this.$refs.noConnect.style.display = "none";
      }

      if (this.emptyVerify) {
        this.$refs.systemRecommend.style.display = "none";
        this.showLoading = true;
        let res = await sponsorRecommend(country, city);
        this.showLoading = false;
        const rescode = res.code;
        if (rescode === 0) {
          const resdata = res.data;
          this.recommendList = resdata;
          this.$refs.recommendMatches.style.display = "block";
          this.$refs.tableWrap.style.display = "block";
          if ((this.$refs.noData.style.display = "block")) {
            this.$refs.noData.style.display = "none";
          }
        }
      }
    },
    async getAllCountry() {
      let res = await getAllCountry();
      const rescode = res.code;
      if (rescode === 0) {
        this.countryList = res.data;
      } else {
        console.error(res.fullMessage);
      }
    },
    async getAllCity(areaCode) {
      let res = await getAllCity(areaCode);
      const rescode = res.code;
      if (rescode === 0) {
        const resdata = res.data;
        this.cityList = resdata;
      } else {
        console.error(res.fullMessage);
      }
    },
    connectHandle(item) {
      this.$refs.noConnect.style.display = "none";
      this.$refs.searchEmpty.style.display = "none";
      this.$refs.tableWrap.style.display = "none";
      this.$refs.recommendMatches.style.display = "none";
      this.$refs.systemRecommend.style.display = "block";
      // 存储到session
      let distSponsor = JSON.stringify(this.formParams);
      sessionStorage.setItem("distSponsor", distSponsor);
      sessionStorage.setItem("distributorId", item.distributorId);
      sessionStorage.setItem("uplineId", item.distributorId);
      sessionStorage.setItem("sponsorData", JSON.stringify(item));
      sessionStorage.setItem("uplineData", JSON.stringify(item));

      this.currentSponsor = item;
      this.recommendList = [];
      this.sponsor = "";
    },

    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.showToast = true;
        this.toastText = "Please check required";
        if (this.$refs.countryEmpty.style.display === "block")
          this.$refs.countryEmpty.style.display = "none";
        if (this.$refs.cityEmpty.style.display === "block")
          this.$refs.cityEmpty.style.display = "none";
        // 点击了一次
        this.submitClickTime = 1;
        return;
      }
      // 是否连接赞助商
      let distSponsor = JSON.parse(sessionStorage.getItem("distSponsor")) || {};
      if (!Object.keys(distSponsor).length) {
        this.$refs.noConnect.style.display = "block";
      } else {
        this.$router.replace("/register/distributor/personalInformation");
      }
    }
  },
  components: {
    "my-dialog": myDialog,
    "my-header": myHeader,
    "my-step": myStep,
    "my-loading": myLoading,
    "my-toast": myToast
  }
};
</script>

<style scoped lang="stylus">
@import '../../../../static/stylus/common.styl'

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
      font-weight bold
      color #575757
      line-height 30px
      @media (max-width: 980px)
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
              background-color #fff
              flex-direction column
            .form-item-top
              display flex
              background-color #E6F0F3
              @media (max-width: 980px)
                display flex
                flex-direction column
                background-color #fff
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
                &.sponsor
                  @media (max-width: 980px)
                    display block
                @media (max-width: 980px)
                  background-color #E6F0F3
                span
                  margin-left 15px
                  @media (max-width: 980px)
                    display block
                .item-main-inner
                  flex 1
                  height 100%
                  color rgb(87, 87, 87)
                  @media (max-width: 980px)
                    padding 10px 0
                .item-searchbtn
                  height 100%
                  color #fff
                  background-color #5ba2cc
                  border-radius 4px
                  padding 0 8px
                  @media (max-width: 980px)
                    padding 10px
            .form-item-bottom
              height 20px
              line-height 20px
              .help-block
                color #a94442
                font-size 12px
                font-weight normal
                @media (max-width: 980px)
                  margin-top 4px
              .show-required
                display none
                color #a94442
                font-size 12px
                font-weight normal
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
    .table-tips
      margin-top 20px
      .table-tip
        display none
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
      .table-tip
        display none
      p
        span
          color #5BA2CC
      .table-wrap
        display none
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
                height 36px
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
