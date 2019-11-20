<template>
  <div id="footer-cont">
    <div class="top-line">
      <img src="http://www.bfsuma.com/BFWebsite_E/img/color_line.png" />
    </div>
    <div class="footer-bg">
      <div class="footer-md">
        <div class="md-left">
          <img class="md-left-logo" src="http://www.bfsuma.com/BFWebsite_E/img/logo_b.png" />
          <p
            class="text"
          >This information is intended only for residents of Countries to which BF Suma products are supplied. The products discussed here may have different product labeling in different countries. Product compositions may be adjusted in different countries.</p>
          <div class="md-left-foot">
            <img src="http://www.bfsuma.com/BFWebsite_E/img/logo1.png" />
            <img src="http://www.bfsuma.com/BFWebsite_E/img/logo2.png" />
            <img src="http://www.bfsuma.com/BFWebsite_E/img/logo3.png" />
            <img src="http://www.bfsuma.com/BFWebsite_E/img/logo4.png" />
          </div>
        </div>
        <div class="md-center">
          <p class="md-center-text">Info Center</p>
          <ul>
            <li>
              <a href="https://www.facebook.com/BFSumaOfficial/" target="_blank">
                <img src="http://www.bfsuma.com/BFWebsite_E/img/logo6.png" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCGXutL4m4ZUUZNj9nAR-4qA" target="_blank">
                <img src="http://www.bfsuma.com/BFWebsite_E/img/logo7.png" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/BFSUMAOFFICIAL" target="_blank">
                <img src="http://www.bfsuma.com/BFWebsite_E/img/logo10.jpg" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/bfsumaofficial/" target="_blank">
                <img src="http://www.bfsuma.com/BFWebsite_E/img/logo11.png" />
              </a>
            </li>
            <li>
              <a
                href="https://play.google.com/store/apps/details?id=com.bf.brightfuture"
                target="_blank"
              >
                <img src="http://www.bfsuma.com/BFWebsite_E/img/logo8.png" />
              </a>
            </li>
            <li>
              <a
                href="https://itunes.apple.com/us/app/touchbfsuma-bright-life-better-future/id1042951296?l=zh&amp;ls=1&amp;mt=8"
                target="_blank"
              >
                <img src="http://www.bfsuma.com/BFWebsite_E/img/logo9.png" />
              </a>
            </li>
          </ul>
        </div>
        <div class="md-right">
          <p class="md-right-text">Connect with BF Suma</p>
          <p class="md-right-botext">Our Offices</p>
          <div class="email">
            <img src="http://www.bfsuma.com/BFWebsite_E/img/youjian.png" alt />
            <span>info@bfsuma.com</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="footer-bottom"
    >Copyright @ 2016 Bright Future Pharmaceutical Laboratories Limited. All Rights Reserved.</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="stylus">
#footer-cont
  position absolute
  left 0
  right 0
  @media (max-width: 980px)
    display none
  .top-line
    >img
      height 4px
      width 100%
  .footer-bg
    padding 40px 0 50px 0
    background-color #5a5959
    color #fff
    .footer-md
      display flex
      max-width 1120px
      margin auto
      .md-left
        flex 1
        .md-left-logo
          max-width 150px
        .text
          font-size 12px
          line-height 20px
          margin 15px 0
        .md-left-foot
          display flex
          >img
            margin-left 6px
      .md-center
        flex 1
        .md-center-text
          text-align center
          font-size 18px
        ul
          margin-top 10px
          li
            margin 8px auto
            width 100px
            a
              display block
              width 100%
              img
                max-width 100%
      .md-right
        flex 1
        margin-left 70px
        .md-right-text
          font-size 18px
        .md-right-botext
          color #d7d7d7
        .email
          color #d7d7d7
          margin-top 20px
          >img
            display inline-block
            padding-right 16px
            width 14px
  .footer-bottom
    text-align center
    padding 30px 0
    color #fff
    background-color #3aa4d1
</style>


