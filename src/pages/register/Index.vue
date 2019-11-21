<template>
  <div id="index-cont">
    <my-header title="We Are BF Suma">Register</my-header>
    <div class="index-md">
      <div class="md-text">
        <p>
          <span class="blue_color">Welcome！</span>
          You can become a BF Suma distributor，get the BF Suma platform which contains products and
          marketing plan information, training and learn about our wide range.To
          start
          your
          business and aim for success, you need to find the right market and products, acquire the
          necessary skills, have a good omega speedmaster replica platform and efficient system support.
          BF
          Suma
          has it all ready for you.
        </p>
        <p>Click below to begin!</p>
      </div>
      <div class="md-btn">
        <a href="javascript:;">
          <img
            src="../../../static/img/register1.png"
            @click="$router.push('/register/distributor')"
            alt
          />
        </a>
      </div>
      <div class="md-link">
        Had an account. Please
        <a
          href="javascript:;"
          class="link-login"
          @click="$router.replace('/login')"
        >Log in</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import myHeader from "@/components/my-header";
export default {
  data() {
    return {};
  },
  components: {
    "my-header": myHeader
  }
};
</script>

<style scoped lang="stylus">
#index-cont
  .index-md
    margin 20px 0 38px 0
    padding 20px
    background-color #fff
    .md-text
      margin 20px 0 20px 20px
      p
        font-size 18px
        line-height 34px
        margin-bottom 20px
        span
          color #5BA2CC
    .md-btn
      text-align right
      img
        display inline
        width 290px
    .md-link
      margin 30px 30px 0 0
      text-align right
      .link-login
        color #5BA2CC
        &:hover
          color #23527c
</style>
