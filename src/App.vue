<template>
  <div id="app">
    <div class="app-md">
      <router-view />
    </div>
    <SumaFooter></SumaFooter>
  </div>
</template>

<script>
import SumaFooter from "@/components/SumaFooter";
import myDialog from "@/components/my-dialog";
import { session } from "@/util/tool";
export default {
  name: "App",
  data() {
    return {
      path: ""
    };
  },
  mounted() {
    this.path = this.$route.path.split("/")[
      this.$route.path.split("/").length - 1
    ];
  },
  methods: {},
  components: { SumaFooter }
};
</script>

<style scoped lang="stylus">
#app
  .app-md
    margin auto
    width 1120px
    @media (max-width: 980px)
      max-width 100vw
      overflow hidden
      background-color #fff
</style>
