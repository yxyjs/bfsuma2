<template>
  <div id="app">
    <SumaHeader @handleExit="handleExit"></SumaHeader>
    <div class="app-md">
      <router-view />
    </div>
    <SumaFooter></SumaFooter>
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

<script>
import SumaFooter from "@/components/SumaFooter";
import SumaHeader from "@/components/SumaHeader";
import myDialog from "@/components/my-dialog";
import { BASE_URL } from "./api/index";
export default {
  name: "App",
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    handleExit() {
      this.showDialog = true;
    },
    dialogHandle(flag) {
      if (flag) {
        location.href = BASE_URL;
        sessionStorage.clear();
      } else {
        this.showDialog = false;
      }
    }
  },
  components: { SumaFooter, SumaHeader, "my-dialog": myDialog }
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
