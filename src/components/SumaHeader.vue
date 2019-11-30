<template>
  <div id="header-cont">
    <div class="header-main">
      <div class="logo">
        <a :href="BASE_URL">
          <img src="http://www.bfsuma.com/BFWebsite_E/img/logo.png" alt />
        </a>
      </div>
      <div class="link">
        <a
          v-if="path==='register' || path==='personalInformation' || path==='countrySponsor' || path==='findPassword' || path==='agreement'"
          href="javascript:;"
          class="guide"
          @click="$router.replace('/login')"
        >Login</a>
        <span v-show="path==='findPassword'">|</span>
        <a
          v-show="path==='login' || path==='findPassword'"
          href="javascript:;"
          class="guide"
          @click="$router.replace('/register')"
        >Register</a>
        <a
          v-show="path==='payment' || path==='business'"
          href="javascript:;"
          class="guide"
          @click="$router.replace('/register/distributor/personal')"
        >{{firstName}}&nbsp;{{lastName}}</a>
      </div>
      <div class="link-exit" v-show="path==='personal'">
        <span class="exit-username">Welcome to BF Suma，{{firstName}}&nbsp;{{lastName}}</span>
        <a href="javascript:;" class="guide" @click="handleExit">
          <span>
            <img class="exit-img" src="../../static/img/exit.png" alt />
          </span>
          <span class="exit-click">&nbsp;Exit</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { BASE_URL } from "@/api/index";
export default {
  data() {
    return {
      BASE_URL: BASE_URL,
      path: "",
      firstName: "",
      lastName: ""
    };
  },
  mounted() {
    const distInformation = JSON.parse(
      sessionStorage.getItem("distInformation")
    );
    if (distInformation) {
      this.firstName = distInformation.firstName;
      this.lastName = distInformation.lastName;
    }
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      const name = user.name.split(" ");
      this.firstName = name[0];
      this.lastName = name[1];
    }

    this.path = this.$route.path.split("/")[
      this.$route.path.split("/").length - 1
    ];
  },
  methods: {
    handleExit() {
      this.$emit("handleExit");
    }
  },
  watch: {
    $route: function(to, from) {
      this.path = this.$route.path.split("/")[
        this.$route.path.split("/").length - 1
      ];
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus">
#header-cont
  background-color #fff
  padding 10px 0 20px 0
  @media (max-width: 980px)
    padding 10px
    background #5ba2cc
  .header-main
    display flex
    justify-content space-between
    margin auto
    max-width 1120px
    .logo
      width 175px
      a
        display block
        >img
          max-width 100%
          @media (max-width: 980px)
            max-width 50%
    .link
      display flex
      .guide
        margin 0 10px
        @media (max-width: 980px)
          color #fff
        &:hover
          color #22adde
    .link-exit
      display flex
      .exit-username
        @media (max-width: 980px)
          display none
      .guide
        display flex
        margin-left 10px
        .exit-click
          font-weight bold
          @media (max-width: 980px)
            color #fff
        .exit-img
          width 14px
          transform translateY(4px)
          @media (max-width: 980px)
            display none
</style>
